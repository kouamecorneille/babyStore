import { Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../interfaces/Icategory';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/Iproduct';
import { EcommerceService } from '../../services/others/ecommerce.service';
import { PagniateDataComponent } from '../pagniate-data/pagniate-data.component';
import { CartService } from '../../services/others/cart.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Store } from '../../interfaces/Ishop';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ArticlesPropulairesComponent } from '../articles-propulaires/articles-propulaires.component';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-categorie-with-filter',
  standalone: true,
  imports: [CommonModule, RouterModule,PagniateDataComponent,NgxSkeletonLoaderModule,SingleProductComponent,ArticlesPropulairesComponent,NgxSliderModule],
  templateUrl: './categorie-with-filter.component.html',
  styleUrl: './categorie-with-filter.component.css'
})
export class CategorieWithFilterComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfStores = new BehaviorSubject<Store[]>([])
  listOfProducts = new BehaviorSubject<Product[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  // @Input() items:Product[] = [];
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15]
  selectedCategory : ICategory[] = [];
  products!: Product[]
  newProducts!: Product[]
  currentPage:number=1
  totalItems:number = 0
  rangeValue: number = 500; // Valeur initiale du slider
  pageSize:number =0
  loading:boolean=true
  private displayedCategoriesCount = 4;
  private displayedStoreCount = 4;
  ecommerceService = inject(EcommerceService);
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'

  minValue: number = 0;
  maxValue: number = 500000;
  sliderValue: number = 500;
  highValue: number = 500000;
  sliderOptions: Options = {
    floor: 500,
    ceil: 500000,
    step: 500,
    translate: (value: number): string => {
      return  value + ' CFA' ;
    }
  };


  constructor(private apiService:ApiService,
    private elementRef: ElementRef,
     private renderer: Renderer2,
     private cartService: CartService,
      private router:Router,
    private ecomService:EcommerceService) {

  }

  generateSlug(text: string): string {
    // Remplace les caractères spéciaux et convertit en minuscules
    const slug = text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remplace les caractères spéciaux par des tirets
      .trim()
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/--+/g, '-'); // Remplace les doubles tirets par un seul tiret

    return slug;
  }

  addTocart(product: Product){

    this.cartService.addToCart(product)
  }

  addToWhishList(product: Product){

    this.cartService.addToWhishList(product)
  }



  ngOnInit(): void {


    this.getCategory()
    this.SortData()
    this.iniData()
    this.getListOfVendors()

  }


  getListOfVendors(){


    this.ecomService.getListOfVendors()
    this.ecomService.listOfStores.subscribe(
     (data) => {
       this.listOfStores.next(data.slice(0, this.displayedStoreCount + 1));
     }
    )

   }



  goToDetails(item:Product){

    this.router.navigate(['/details-product', item.slug], {state: { scrollTop: 0 }});
  }
  trackById(index: number, item: Store): string {
    return item.id;
  }


  iniData(){
    this.ecommerceService.getAllProducts()
    this.ecommerceService.listOfProduct.subscribe((data) => {

      this.listOfProducts.next(data.slice(0,10))
    })

    this.ecommerceService.filterProductsByDate(this.ecommerceService.listOfProduct.value)
  }

  onPageChange(){

  }


  getCategory() {
    this.ecomService.getCategory()
    this.ecomService.listOfCategory.subscribe(
      (data) => {
        this.listOfData.next(data.slice(0, this.displayedCategoriesCount + 1));
        const category =this.shuffleArray(data)
        this.selectedCategory = category
      }
    )
  }

  showMoreCategory(){

    this.displayedCategoriesCount += 4;
    this.ecomService.listOfCategory.subscribe(
      (data) => {
        this.listOfData.next(data.slice(0,this.displayedCategoriesCount));
      }
    )
  }

  // Function to shuffle an array
  shuffleArray(array: ICategory[]): ICategory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 4);
  }

  showMoreStores(){

    this.displayedStoreCount += 4;
    this.ecomService.listOfStores.subscribe(
      (data) => {
        this.listOfStores.next(data.slice(0, this.displayedStoreCount));
      }
    )
  }


  SortData(){

    const body = this.elementRef.nativeElement.ownerDocument.body;
    const cartWrap = this.elementRef.nativeElement.querySelector('.sort-by-product-area');
    const cartContent = this.elementRef.nativeElement.querySelector('.sort-by-dropdown');

    if (cartWrap) {
      this.renderer.listen(cartWrap, 'click', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const sortByProductWrap = target.closest('.sort-by-product-wrap');

        if (sortByProductWrap) {
          if(sortByProductWrap.parentElement){

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
