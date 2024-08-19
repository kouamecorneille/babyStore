import { Component, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../../../interfaces/Ishop';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { ICategory } from '../../../interfaces/Icategory';
import { Product } from '../../../interfaces/Iproduct';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-details-vendor',
  templateUrl: './details-vendor.component.html',
  styleUrl: './details-vendor.component.css' // Corrected property name
})
export class DetailsVendorComponent {
  vendorDetails!: Store;
  slugVendor: string = '';
  listOfLoader = Array.from({ length: 15 }, (_, i) => i); // Simplified loader array initialization
  listOfData = new BehaviorSubject<ICategory[]>([]);
  storeName: string = '';
  ecommerceService = inject(EcommerceService);
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'
  selectedCategory!:string;
  isSelectedCategory:boolean=false
  searchString:string ='';
  searchProducts = new BehaviorSubject<Product[]>([])
  listOfVendorProducts = new BehaviorSubject<Product[]>([])
  listOfVentesFlash = new BehaviorSubject<Product[]>([])
  loaderProduct :boolean = false

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getStoreDetails();
    this.getCategory();
  }

  parseIntValue(value:string):number{

    return parseInt(value);
  }

  searchItem() {
    if (this.searchString && this.searchString.length >= 4) {
      this.ecommerceService.searchProduct(this.searchString).subscribe(
        (response: any) => {
          if (response) {
            console.log('Response:', response);
            console.log('Vendor ID:', this.vendorDetails.id);

            const storeProducts = response.filter((item:any) => {
              console.log('Item Shop ID:', item.shop); // Debug: check the shop id of each item
              return item.shop === this.vendorDetails.id;
            });

            console.log('Filtered Store Products:', storeProducts);
            this.searchProducts.next(storeProducts);
          }
        },
        (err: any) => {
          console.error('Error during product search:', err);
        }
      );
    }
  }


  getVendorProducts(slug:string) {
    this.loaderProduct = true;
    this.apiService.getItems(`/shops/${slug}/products`).subscribe(
      (response:Product[]) => {

        this.listOfVendorProducts.next(response.reverse());
        this.listOfVentesFlash.next(response.reverse().slice(8, 15));
        this.loaderProduct = false;
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getVendorProductsCategory(category_id:string,shop_id:string) {
    this.loaderProduct = true;
    this.apiService.getItems(`/products/shop/${shop_id}/category/${category_id}/`).subscribe(
      (response:Product[]) => {

        this.listOfVendorProducts.next(response.reverse());
        this.loaderProduct = false;
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  chooseCategory(item:ICategory){

    this.isSelectedCategory = true
    this.selectedCategory = item.id
    this.getVendorProductsCategory(this.selectedCategory, this.vendorDetails.id)
  }

  getShopDetails(slug:string) {

    this.apiService.getItem("shops", slug).subscribe(
      (response:Store) => {

        this.vendorDetails = response;
      }
    )

  }


  getStoreDetails(): void {
    const nameParam = this.activatedRoute.snapshot.paramMap.get('name');
    if (nameParam) {
      this.slugVendor = nameParam;
      this.getShopDetails(this.slugVendor)
      this.getVendorProducts(this.slugVendor);

    } else {
      console.error('No "name" parameter found in the route.');
    }
  }

  // getVendorProducts(): void {
  //   if (this.vendorDetails) {
  //     this.ecommerceService.getVendorProducts(this.vendorDetails.slug);
  //     this.ecommerceService.filterProductsByDate(this.ecommerceService.listOfProduct.value);
  //   }
  // }

  getCategory(): void {
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {
        this.listOfData.next(response.slice(0,10));
      },
      (error) => console.error(error)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  addToWishList(product: Product): void {
    this.cartService.addToWhishList(product);
  }

  sortData(): void {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    const cartWrap = this.elementRef.nativeElement.querySelector('.sort-by-product-area');
    const cartContent = this.elementRef.nativeElement.querySelector('.sort-by-dropdown');

    if (cartWrap) {
      this.renderer.listen(cartWrap, 'click', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const sortByProductWrap = target.closest('.sort-by-product-wrap');

        if (sortByProductWrap && sortByProductWrap.parentElement) {
          const isShow = sortByProductWrap.parentElement.classList.contains('show');
          const sortbyDropdown = sortByProductWrap.nextElementSibling as HTMLElement;

          if (!isShow) {
            sortByProductWrap.parentElement.classList.add('show');
            sortbyDropdown.classList.add('show');
          } else {
            sortByProductWrap.parentElement.classList.remove('show');
            sortbyDropdown.classList.remove('show');
          }
        }
      });

      this.renderer.listen(body, 'click', (event) => {
        const target = event.target as HTMLElement;
        const isCartWrap = target.classList.contains('sort-by-product-area') || target.closest('.sort-by-product-area');

        if (!isCartWrap && cartWrap.classList.contains('show')) {
          cartWrap.classList.remove('show');
          cartContent.classList.remove('show');
        }
      });
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ecommerceService.storeDetails.complete()
    this.ecommerceService.listOfVendorProducts.complete()
  }


}
