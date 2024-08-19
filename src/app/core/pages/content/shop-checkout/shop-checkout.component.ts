import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartService } from '../../../services/others/cart.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from '../../../interfaces/IorderItem';
import { Router } from '@angular/router';

export interface UserInfo{

    full_name:string;
    delivery_address:string;
    commune:string;
}

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.css']
})
export class ShopCheckoutComponent {

  cartItems = new BehaviorSubject<CartItem[]>([]);
  totalCheckout :number = 0;
  cartService = inject(CartService)
  full_name!:string
  delivery_address!:string
  commune!:string
  note!:string
  loading:boolean = false
  orderItems:OrderItem[] = [];
  amountCoupon:number = 0;

  User : UserInfo = {
    full_name:'',
    delivery_address:'',
    commune:''
  }

  constructor(private apiService:ApiService,private toastr: ToastrService, private router:Router) {
    if (typeof localStorage !== 'undefined') {
      // Load the cart from localStorage when initializing the service
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems.next(JSON.parse(storedCartItems));
      }
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })
  }

  sendWhatsappMessage() {
    const cartItemsValue = this.cartItems.value;
    if (cartItemsValue.length > 0) {
      const shopName = cartItemsValue[0].product.shop.name;
      const phoneNumber = cartItemsValue[0].product.shop.phone_number_1;

      let messageText = `Bonjour 👋 ${shopName},\n\n🌟 J'aimerais commander les articles suivants :\n\n`;

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


  parseProduct(){

    this.cartItems.value.forEach((item) => {

      const dt ={

        quantity:item.quantity,
        product:item.product.id,
        price:item.product.price,
        shop:item.product.shop.id,

      }

      this.orderItems.push(dt)

    })

  }

  getCouponAmount(){

  }


  onSubmit(){

    this.loading = true;
    this.parseProduct()

    const data ={

      full_name:this.full_name,
      delivery_address:this.delivery_address,
      commune:this.commune,
      note:this.note,
      items: this.orderItems,
      status:'pending'

    }

    this.User.full_name = data.full_name
    this.User.commune = data.commune
    this.User.delivery_address = data.delivery_address

    this.apiService.postOrder(data, 'anonymous-orders').subscribe(

      (response) => {

        if(response){
          this.cartService.cartItemsSignalSummary.set(this.cartItems.value)
          this.cartService.userInfo.set(this.User)
          this.cartService.ressetCart()
          this.loading = false;
          this.toastr.success('Votre commande a été prise en compte !', 'Succès !', { timeOut: 3000 });
          this.router.navigate(['/success-orders']);

        }
      },
      (err) => {
        console.log(err)
        this.loading = false
        this.toastr.error('Oops, nous vaons rencontrer une erreur !', 'Succès !', { timeOut: 3000 });
      }
    )

  }
}
