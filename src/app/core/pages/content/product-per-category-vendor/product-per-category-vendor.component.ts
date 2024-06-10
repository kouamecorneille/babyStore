import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../../interfaces/Icategory';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { CartService } from '../../../services/others/cart.service';
import { Product } from '../../../interfaces/Iproduct';

@Component({
  selector: 'app-product-per-category-vendor',
  templateUrl: './product-per-category-vendor.component.html',
  styleUrl: './product-per-category-vendor.component.css'
})
export class ProductPerCategoryVendorComponent {

  params: string | null;
  listOfData = new BehaviorSubject<ICategory[]>([])
  categoryName!:string
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15]
  ecommerceService = inject(EcommerceService);
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'

  constructor(private activeRoute: ActivatedRoute,private cartService: CartService) {

    this.params = this.activeRoute.snapshot.paramMap.get('name');

  }

  ngOnInit(): void {


      // this.convertSlugToText(this.params);
      setTimeout(() => {
        if(this.params){
          this.ecommerceService.getProductsVendorBySlug(this.params);
        }
      }, 2000);


  }

  // Fonction pour convertir un slug en texte lisible avec la première lettre du premier mot en majuscule
  convertSlugToText(slug: string |null) {

    // Remplace les tirets par des espaces et convertit en minuscules
    if(slug){

      const words = slug.split('-').map(word => word.toLowerCase());
      const normalizedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      // Normalise le texte pour mettre la première lettre en majuscule

      console.log(normalizedText)
      this.categoryName = normalizedText
    }

  }


  addTocart(product: Product){

    this.cartService.addToCart(product)
  }

  addToWhishList(product: Product){

    this.cartService.addToWhishList(product)
  }




}
