import { Component } from '@angular/core';
import { ICategory } from '../../../interfaces/Icategory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Product } from '../../../interfaces/Iproduct';

@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrl: './hotdeals.component.css',
  host:{ngSkipHydration:'true'}
})
export class HotdealsComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  products!: Product[]

  constructor(private apiService:ApiService, private ecommerceService:EcommerceService) {

  }

  ngOnInit(): void {

    this.getCategory()
    this.iniData()
  }


  iniData(){
    this.ecommerceService.getAllProducts()
    this.ecommerceService.listOfProduct.subscribe((data) => {

      setTimeout(() => {
        this.products = data;
      }, 3000);
    })
  }


  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console

        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this.listOfData.next(response.slice(0, 3));

        // Affichage de la valeur actuelle de listOfData dans la console
        console.log(this.listOfData.value);
      }
    );
  }








}
