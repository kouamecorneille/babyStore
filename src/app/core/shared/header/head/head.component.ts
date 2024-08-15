import { Component, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { HeaderBottomComponent } from '../header-bottom/header-bottom.component';
import { HeaderActionRightComponent } from '../header-action-right/header-action-right.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import  $ from 'jquery';
import { CartService } from '../../../services/others/cart.service';
import { Product } from '../../../interfaces/Iproduct';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

interface CartItem {
  quantity: number;
  product: Product;
}


@Component({
  selector: 'app-head',
  standalone: true,
  imports: [RouterModule,MobileMenuComponent,LoadingBarRouterModule,HeaderBottomComponent,HeaderActionRightComponent, CommonModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
  // host:{ngSkipHydration:'true'}
})
export class HeadComponent {

  currentYear: number;
  totalItems:number = 0;
  totalCheckout:number = 0;
  totalItemsWhishList:number = 0;
  cartItemsSignal = signal<CartItem[]>([]);
  ecomService = inject(EcommerceService)


  baseUrl:string='http://djassa2baby.pythonanywhere.com/'

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router:Router,public cartService: CartService) {
    // Récupérer l'année actuelle
    this.currentYear = new Date().getFullYear();
    // this.totalItems = this.cartService.totalItems()
  }



  ngOnInit(): void {

    this.cartService.totalItems.subscribe((data)=>{
      this.totalItems = data  //recuperer le nombres d'articles dans  le panier
    })

    this.cartItemsSignal.set(this.cartService.getCartItems().slice(0,3))
    //this.cartItems = this.cartService.getCartItems().slice(0,3)

     this.cartService.totalCart.subscribe((data)=>{
      // console.log(data)
      this.totalCheckout = data //recuperer le prix total des articles dans le panier
    })

    this.cartService.totalItemsWhishList.subscribe((data)=>{
      // console.log(data)
      this.totalItemsWhishList = data
    })
  }

  tooggleClose(){
    this.ecomService.searchVisible.set(false)
  }



  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeMobileMenu();


    }
  }


  deleteItem(id:string){

    this.cartService.removeFromCart(id)

  }


  Logout(){

    localStorage.clear()
    this.router.navigate(['/auth/login'])

  }




  activeMobileMenu(){

    var $offCanvasNav = $(".mobile-menu"),
        $offCanvasNavSubMenu = $offCanvasNav.find(".dropdown");

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /* Category Sub Menu Toggle */
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e:any) {
      const $this = $(this);
      if (
        $this.parent().hasClass("menu-item-has-children") ||
        $this.parent().hasClass("has-children") ||
        $this.parent().hasClass("has-sub-menu")
      ) {
        e.preventDefault();
        if ($this.siblings("ul:visible").length) {
            $this.parent("li").removeClass("active");
            $this.siblings("ul").slideUp();
        } else {
          $this.parent("li").addClass("active");
          $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
          $this.closest("li").siblings("li").find("ul:visible").slideUp();
          $this.siblings("ul").slideDown();
        }
      }
    });

  }
}
