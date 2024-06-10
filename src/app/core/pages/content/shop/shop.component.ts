import { Component, inject } from '@angular/core';
import { ICategory } from '../../../interfaces/Icategory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Product } from '../../../interfaces/Iproduct';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {


  listOfDataDeals = new BehaviorSubject<Product[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  ecommerceService = inject(EcommerceService);
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12,13,14,15]

  constructor(private apiService:ApiService, private cartService: CartService) {

  }




  ngOnInit(): void {

    this.iniData()


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




  // getCategory() {
  //   // Appel de l'API pour récupérer les catégories d'éléments
  //   this.apiService.getItems('categories').subscribe(
  //     (response: ICategory[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
  //       console.log(response);  // Affichage de la réponse dans la console

  //       // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
  //       this.listOfData.next(response);

  //       // Affichage de la valeur actuelle de listOfData dans la console
  //       console.log(this.listOfData.value);
  //     }
  //   );
  // }


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
