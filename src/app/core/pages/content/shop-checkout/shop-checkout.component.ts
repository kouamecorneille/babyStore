import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrl: './shop-checkout.component.css'
})
export class ShopCheckoutComponent {

  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  totalCheckout:number = 0;
  cartService = inject(CartService)

  constructor() {
    if (typeof localStorage !== 'undefined') {
      // Charger le panier depuis le localStorage lors de l'initialisation du service
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems.next(JSON.parse(storedCartItems));
      }
    }
  }


  ngOnInit(): void {


     this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })


  }




}
