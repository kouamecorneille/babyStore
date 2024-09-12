import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartService } from '../../../services/others/cart.service';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { OrderItem } from '../../../interfaces/IorderItem';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { User, UserApiResponse } from '../../../interfaces/Iuser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrytodataService } from '../../../services/crytodata.service';

export interface UserInfo{

    full_name:string;
    delivery_address:string;
    commune:string;
    montantCoupon?:number;
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
  userSession!:User
  coupon_code:string=''
  montantCoupon!:number
  LoginForm!:FormGroup
  loader = false
  User : UserInfo = {
    full_name:'',
    delivery_address:'',
    commune:'',
  }

  constructor(private apiService:ApiService,private toastr: ToastrService, private crypt:CrytodataService,private router:Router, private fb:FormBuilder,public AuthService:AuthenticateService) {
    if (typeof localStorage !== 'undefined') {
      // Load the cart from localStorage when initializing the service
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        this.cartItems.next(JSON.parse(storedCartItems));
      }


    }

    this.LoginForm = this.fb.group({
      numero:["", [Validators.required, Validators.minLength(10)]],
      password:["", [Validators.required,Validators.minLength(6)]]
    })

    this.userSession = this.AuthService.getUser()!
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })

    this.setUserInfo()

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  login() {

    if (this.LoginForm.valid) {
      this.loader = true;
      const data = {
        phone_number: this.LoginForm.value.numero,
        password: this.LoginForm.value.password
      };

      this.AuthService.login(data).subscribe(
        (response: UserApiResponse) => {
          if (response) {

            this.AuthService.isAuthenticate = true;
            const userData = response;

            localStorage.setItem('Djassa2Access', this.crypt.encryptData(userData.access));
            localStorage.setItem('Djassa2Refrech', this.crypt.encryptData(userData.refresh));
            localStorage.setItem('DjassaAuthUser',  this.crypt.encryptData(userData.user));

            this.full_name = userData.user.first_name + ' ' + userData.user.last_name;
            this.delivery_address = userData.user.delivery_adresse
            this.commune = userData.user.phone_number

            this.loader = false;

            this.toastr.success('Connexion réussie avec succès!', 'Succès !');
          }
        },
        (err: any) => {
          this.loader = false;
          console.log(err);
          if(err.status==401){

            this.toastr.error('Numéro ou mot de passe incorrect, réessqyer encore !', 'Error');

          }else{

            this.toastr.error('Impossible de se connecter pour le moment !', 'Error');

          }
        }
      );
    } else {
      this.loader = false;
      this.toastr.error('Veuillez remplir tous les champs du formulaire !', 'Error');
    }
  }

  getCouponDetails(){

    if(this.coupon_code){
      this.apiService.getItem('coupons/coupon-details', this.coupon_code).subscribe(
        (response:any)=>{
          this.montantCoupon = response

          this.totalCheckout -= this.montantCoupon
        }
      )
    }

  }


  setUserInfo(){

    if(this.userSession){

      this.full_name = this.userSession.first_name + " " + this.userSession.last_name
      this.commune = this.userSession.phone_number
      this.delivery_address = this.userSession.delivery_adresse

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


  onSubmit() {
    if (this.full_name && this.delivery_address && this.commune && this.note) {
      if(this.orderItems.length > 0){
        this.loading = true; // Indiquer que l'opération est en cours

        const data = {
          full_name: this.full_name,
          delivery_address: this.delivery_address,
          commune: this.commune,
          note: this.note,
          items: this.orderItems,
          status: 'pending'
        };

        // Mettre à jour les informations de l'utilisateur
        this.User.full_name = data.full_name;
        this.User.commune = data.commune;
        this.User.delivery_address = data.delivery_address;
        if(this.montantCoupon){
          this.User.montantCoupon = this.montantCoupon;
        }

        this.apiService.postOrder(data, 'anonymous-orders').subscribe(
          (response) => {
            if (response) {
              this.cartService.cartItemsSignalSummary.set(this.cartItems.value);
              this.cartService.userInfo.set(this.User);
              this.cartService.ressetCart();
              this.toastr.success('Votre commande a été prise en compte !', 'Succès !', { timeOut: 3000 });
              this.router.navigate(['/success-orders']);
            }

            this.loading = false;
            this.parseProduct(); // Appeler après le succès ou échec
          },
          (err) => {
            console.log(err);
            this.loading = false;
            this.toastr.error('Oops, nous avons rencontré une erreur !', 'Erreur !', { timeOut: 3000 });
          }
        );
      }else {
        this.loading = false;
        this.toastr.error('Votre pannier est vide, vous ne pouvez  pas effectuer de commande !', 'Erreur !', { timeOut: 4000 });
      }

    } else {
      this.loading = false;
      this.toastr.error('Veuillez remplir les informations de livraison !', 'Erreur !', { timeOut: 4000 });
    }
  }

}
