import { Component, inject } from '@angular/core';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  totalItems:number = 0;
  totalCheckout:number = 0;
  totalItemsWhishList:number = 0;
  cartItems:CartItem[] = [];
  cartService = inject(CartService)
  quantity: number=0;

  constructor() {

    this.cartService.totalItems.subscribe((data)=>{
     this.totalItems = data
     })

     this.cartItems = this.cartService.cartItemsSignal();

   }

   removeItem(id:string){

    this.cartService.removeFromCart(id)
   }


   addQuantity(obj:CartItem): void {

    obj.quantity +=1
    this.cartService.updateCartItemQuantity(obj.product.id, obj.quantity);

  }

    reduceQuantity(obj:CartItem): void {
      if (obj.quantity > 1) { // Vérifiez si la quantité est supérieure à 1
        obj.quantity -= 1; // Réduisez la quantité seulement si elle est supérieure à 1
        this.cartService.updateCartItemQuantity(obj.product.id, obj.quantity);

      }
    }



  stringToNumber(value: string): number {
    // Utilisation de parseFloat pour obtenir un nombre décimal
    const parsedValue = parseFloat(value);
    // Si la conversion réussit, parseFloat retournera un nombre valide
    // Sinon, il retournera NaN (Not-a-Number). Nous retournons null dans ce cas.
    return parsedValue;
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



}
