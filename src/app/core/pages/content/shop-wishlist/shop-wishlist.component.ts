import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WhishListItem } from '../../../interfaces/IwhichList';
import { CartService } from '../../../services/others/cart.service';
import { Product } from '../../../interfaces/Iproduct';

@Component({
  selector: 'app-shop-wishlist',
  templateUrl: './shop-wishlist.component.html',
  styleUrl: './shop-wishlist.component.css'
})
export class ShopWishlistComponent {

  whishListItems: BehaviorSubject<WhishListItem[]> = new BehaviorSubject<WhishListItem[]>([]);
  constructor(public cartService: CartService) {

    if (typeof localStorage !== 'undefined') {
      // Charger le panier depuis le localStorage lors de l'initialisation du service
      const storedWhishListItems = localStorage.getItem('whishListItems');
      if (storedWhishListItems) {
        this.whishListItems.next(JSON.parse(storedWhishListItems));
      }
    }


  }

  addTocart(product: Product){

    this.cartService.addToCart(product, 1)
  }


  removeItem(id:string){

    this.cartService.removeFromWhishList(id)

  }


}
