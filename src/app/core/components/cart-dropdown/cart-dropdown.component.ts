import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/others/cart.service';
import { CartItem } from '../../interfaces/IcartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.css'
})
export class CartDropdownComponent {

  totalItems:number = 0;
  totalCheckout:number = 0;
  totalItemsWhishList:number = 0;
  cartItems:CartItem[] = [];
  cartService = inject(CartService)
  constructor() {

   this.cartService.totalItems.subscribe((data)=>{
    this.totalItems = data
    })

    ///this.cartItems = this.cartService.cartItemsSignal().slice(0,3)

  }

  ngOnInit(): void {
    
    this.cartService.totalItems.subscribe((data)=>{
      this.totalItems = data  //recuperer le nombres d'articles dans  le panier
    })


     this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })


  }

  deleteItem(id:string){

    this.cartService.removeFromCart(id)
  }

}
