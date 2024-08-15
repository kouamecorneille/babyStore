import { Component, Input } from '@angular/core';
import { SingleProductComponent } from "../single-product/single-product.component";
import { Product } from '../../interfaces/Iproduct';
import { ICategory } from '../../interfaces/Icategory';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EcommerceService } from '../../services/others/ecommerce.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-articles-propulaires',
    standalone: true,
    templateUrl: './articles-propulaires.component.html',
    styleUrl: './articles-propulaires.component.css',
    imports: [SingleProductComponent, SingleProductComponent, CommonModule, RouterModule]
})
export class ArticlesPropulairesComponent {

    @Input() title!:string
    @Input() categorys:ICategory[] =[];
    @Input() produts !: Product[];
    productsCategory1!:Product[];
    productsCategory2!:Product[];
    productsCategory3!:Product[];
    productsCategory4!:Product[];
    allProducts!:Product[];
    offersProducts!:Product[];

    constructor(private ecomService:EcommerceService) {

    }


    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.ecomService.getAllProducts()
      this.ecomService.listOfProduct.subscribe(
        (data) => {

          this.allProducts = data.slice(10, 20)
          this.offersProducts = data.slice(20, 30)
        }
      )
    }

    filterProducts(categoryId: string): Observable<Product[]> {
      return this.ecomService.listOfProduct.pipe(
        map((data) => {
          return data.filter((val) => {

            console.log('VAL',val.category)

            val.category.id === categoryId
          });
        })
      );
    }


}
