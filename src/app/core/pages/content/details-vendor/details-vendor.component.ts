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
  listOfLoader = Array.from({ length: 16 }, (_, i) => i); // Simplified loader array initialization
  listOfData = new BehaviorSubject<ICategory[]>([]);
  storeName: string = '';
  ecommerceService = inject(EcommerceService);
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'
  selectedCategory!:string;

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

  chooseCategory(item:ICategory){

    this.selectedCategory = item.slug
    this.ecommerceService.getVendorProductsCategory(this.selectedCategory);

    console.log(this.ecommerceService.listOfProductByCategory.value)
    this.ecommerceService.listOfProductByCategory.subscribe(
      (products)=>{
        this.ecommerceService.listOfVendorProducts.next(products)
      }
    )

  }


  getStoreDetails(): void {
    const nameParam = this.activatedRoute.snapshot.paramMap.get('name');
    if (nameParam) {
      this.slugVendor = nameParam;
      this.ecommerceService.getShopDetails(this.slugVendor);
      this.ecommerceService.storeDetails.subscribe(
        (data) => {
          this.vendorDetails = data;
          this.getVendorProducts();
        }
      );
    } else {
      console.error('No "name" parameter found in the route.');
    }
  }

  getVendorProducts(): void {
    if (this.vendorDetails) {
      this.ecommerceService.listOfVendorProducts.next([]);
      this.ecommerceService.getVendorProducts(this.vendorDetails.slug);
      this.ecommerceService.filterProductsByDate(this.ecommerceService.listOfProduct.value);
    }
  }

  getCategory(): void {
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {
        this.listOfData.next(response);
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


}
