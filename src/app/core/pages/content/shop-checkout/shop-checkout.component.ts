import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.css']
})
export class ShopCheckoutComponent {

  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  totalCheckout:number = 0;
  cartService = inject(CartService)

  constructor() {
    if (typeof localStorage !== 'undefined') {
      // Load the cart from localStorage when initializing the service
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems.next(JSON.parse(storedCartItems));
      }
    }
  }

  sendWhatsappMessage() {
    const cartItemsValue = this.cartItems.value;
    if (cartItemsValue.length > 0) {
      const shopName = cartItemsValue[0].product.shop.name;
      const phoneNumber = cartItemsValue[0].product.shop.phone_number_1;

<<<<<<< HEAD
      let messageText = `Bonjour 👋 ${shopName},\n\n🌟 J'aimerais commander les articles suivants :\n\n`;
=======
  ngOnInit(): void {


     this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })


  }



>>>>>>> 62b3b6ea089bba01c93e6c7f6c275b15cd5b68c0

      cartItemsValue.forEach((item) => {
        const productName = `${item.product.name}`; // Product name
        const quantity = `${item.quantity}`; // Convert the quantity to text
        messageText += `${productName} quantite souhaitée : ${quantity}\n\n`;
      });

      messageText += `Merci beaucoup et passez une excellente journée ! 😊`;

      const message = encodeURIComponent(messageText);
      window.open(`https://api.whatsapp.com/send?phone=+225${phoneNumber}&text=${message}`);
    } else {
      console.error('No items in the cart to send a WhatsApp message');
    }
  }
}
