import { Component, inject, signal } from '@angular/core';
import { ICategory } from '../../../interfaces/Icategory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Product } from '../../../interfaces/Iproduct';
import { CartService } from '../../../services/others/cart.service';
import { Store } from '../../../interfaces/Ishop';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {


  listOfDataDeals = new BehaviorSubject<Product[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  listOfStores = new BehaviorSubject<Store[]>([])
  ecommerceService = inject(EcommerceService);
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15]
  searchProducts = new BehaviorSubject<Product[]>([])
  private displayedStoreCount = 4;
  activedFilter = signal<boolean>(false)
  selectedCategory!:string;
  searchString:string ='';
  displayedCategoriesCount=4

  minValue: number = 0;
  maxValue: number = 100000;
  sliderValue: number = 1000;
  highValue: number = 100000;
  sliderOptions: Options = {
    floor: 1000,
    ceil: 100000,
    step: 1000,
    translate: (value: number): string => {
      return  value + ' CFA' ;
    }
  };

  loading: boolean=false;

  constructor(private cartService: CartService, private ecomService:EcommerceService) {

  }


  ngOnInit(): void {

    this.iniData()
    this.getCategory()
    this.getListOfVendors()

  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }

  getListOfVendors(){


    this.ecomService.getListOfVendors()
    this.ecomService.listOfStores.subscribe(
     (data) => {
       this.listOfStores.next(data.slice(0, this.displayedStoreCount + 1));
     }
    )

   }


  searchItem(){

    if(this.searchString && this.searchString.length >=4){
      this.loading = true
      this.ecomService.searchProduct(this.searchString).subscribe(
        (response:Product[])=>{

          if(response){

            this.searchProducts.next(response);
            this.loading = false
          }
        }
      )
    }

  }

  slideConfig = {
    "arrows":true,
    "draggable": true,
    "dots": false,
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "loop": true,
    "fade": true,
    "autoplay": true,
    "prevArrow": '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    "nextArrow": '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };

  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];



  showMoreCategory(){

    this.displayedCategoriesCount += 4;
    this.ecomService.listOfCategory.subscribe(
      (data) => {
        this.listOfData2.next(data.slice(0,this.displayedCategoriesCount));
      }
    )
  }

  showMoreStores(){

    this.displayedStoreCount += 4;
    this.ecomService.listOfStores.subscribe(
      (data) => {
        this.listOfStores.next(data.slice(0, this.displayedStoreCount));
      }
    )
  }



  chooseCategory(item:ICategory){

    this.selectedCategory = item.id
  }

  getCategory() {
    this.ecomService.getCategory()
    this.ecomService.listOfCategory.subscribe(
      (data) => {
        this.listOfData2.next(data.slice(0, this.displayedCategoriesCount + 1));
      }
    )
  }



  getRandomElements<T>(data: T[], count: number = 4): T[] {
    // Mélange le tableau avec l'algorithme de Fisher-Yates
    const shuffled = data.slice(); // Crée une copie du tableau
    console.log(shuffled)
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échange les éléments
    }
    return shuffled.slice(0, count); // Retourne les `count` premiers éléments
  }

  activeFilter(){

    this.activedFilter.set(!this.activedFilter())

  }



  trackByFn(index: number, item: any): any {
    return index; // or item.id if you have unique identifiers
  }


  iniData(){
    this.ecommerceService.getProductBouqtiqueOfficielle()


    this.ecommerceService.listOfProducts.subscribe(data => {
      const shuffledData = this.getRandomElements(data)

      this.listOfDataDeals.next(shuffledData)
    })

  }

  addTocart(product: Product){

    this.cartService.addToCart(product)
  }

  addToWhishList(product: Product){

    this.cartService.addToWhishList(product)
  }







}
