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

@Component({
  selector: 'app-categorie-with-filter',
  standalone: true,
  imports: [CommonModule, RouterModule,PagniateDataComponent,NgxSkeletonLoaderModule],
  templateUrl: './categorie-with-filter.component.html',
  styleUrl: './categorie-with-filter.component.css'
})
export class CategorieWithFilterComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfStores = new BehaviorSubject<Store[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  // @Input() items:Product[] = [];
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15]
  products!: Product[]
  newProducts!: Product[]
  currentPage:number=1
  totalItems:number = 0
  pageSize:number =0
  loading:boolean=true

  ecommerceService = inject(EcommerceService);
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'

  constructor(private apiService:ApiService,private elementRef: ElementRef, private renderer: Renderer2,private cartService: CartService, private router:Router) {

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



  getListOfVendors(){


    this.apiService.getItems(`shops`).subscribe(
      (response:Store[]) => {

        console.log(response)

        if(response){
         setTimeout(()=>{
          this.listOfStores.next(response);
         }, 1000)

        }
      },
      (err:any)=>{

        console.log(err)
      }
    )

  }





  ngOnInit(): void {

    this.getCategory()
    this.SortData()
    this.iniData()
    this.getListOfVendors()

  }



  goToDetails(item:Product){

    this.router.navigate(['/details-product', item.slug], {state: { scrollTop: 0 }});
  }
  trackById(index: number, item: Store): string {
    return item.id;
  }


  iniData(){
    this.ecommerceService.getAllProducts()
    // this.ecommerceService.listOfProduct.subscribe((data) => {

    //   this.products = data;
    // })

    this.ecommerceService.filterProductsByDate(this.ecommerceService.listOfProduct.value)
  }

  onPageChange(){

  }


  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console

        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this.listOfData.next(response.slice(0, 10));
        // Affichage de la valeur actuelle de listOfData dans la console
      }
    );
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
