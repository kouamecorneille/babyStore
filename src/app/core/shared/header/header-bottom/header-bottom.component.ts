import { Component, Inject, PLATFORM_ID, Renderer2, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { ICategory } from "../../../interfaces/Icategory";
import { CartService } from '../../../services/others/cart.service';
import { CartItem } from '../../../interfaces/IcartItem';
import { CartDropdownComponent } from '../../../components/cart-dropdown/cart-dropdown.component';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { RecommandationsCategorieComponent } from '../../../components/recommandations-categorie/recommandations-categorie.component';

@Component({
  selector: 'app-header-bottom',
  standalone: true,
  imports: [CommonModule, RouterModule, CartDropdownComponent,RecommandationsCategorieComponent],
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.css']
})
export class HeaderBottomComponent{

  totalItems: number = 0;
  totalItemsWhishList: number = 0;
  cartItems: CartItem[] = [];
  isOpen = false;
  listOfData = new BehaviorSubject<ICategory[]>([]);
  listOfData2 = new BehaviorSubject<ICategory[]>([]);
  ecomService =inject(EcommerceService)

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      //this.mobileHeaderActive();
    }

    this.getCategory();

    this.cartService.totalItemsWhishList.subscribe(data => {
      this.totalItemsWhishList = data;
    });

    this.cartService.totalItems.subscribe(data => {
      this.totalItems = data; // Récupérer le nombre d'articles dans le panier
    });
  }

  toggleSearch() {
    this.isOpen = !this.isOpen;
  }

  tooggleOpen(){
    console.log("-----this.ecomService.searchVisible.set(true)-------")
    this.ecomService.searchVisible.set(true)
  }

  mobileHeaderActive(): void {
    const navbarTrigger = this.document.querySelector('.burger-icon');
    const endTrigger = this.document.querySelector('.mobile-menu-close');
    const container = this.document.querySelector('.mobile-header-active');
    const body = this.document.body;

    // Ajouter overlay au body
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'body-overlay-1');
    this.renderer.appendChild(body, overlay);

    if (navbarTrigger && endTrigger && container) {
      this.renderer.listen(navbarTrigger, 'click', (e: Event) => {
        e.preventDefault();
        this.renderer.addClass(container, 'sidebar-visible');
        this.renderer.addClass(body, 'mobile-menu-active');
      });

      this.renderer.listen(endTrigger, 'click', () => {
        this.renderer.removeClass(container, 'sidebar-visible');
        this.renderer.removeClass(body, 'mobile-menu-active');
      });

      this.renderer.listen(overlay, 'click', () => {
        this.renderer.removeClass(container, 'sidebar-visible');
        this.renderer.removeClass(body, 'mobile-menu-active');
      });
    }
  }

  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {
        // Mettre à jour la première partie de la liste de données avec les 6 premiers éléments
        this.listOfData.next(response.slice(0, 6));

        // Mettre à jour la deuxième partie de la liste de données avec le reste des éléments
        this.listOfData2.next(response.slice(6));

        // Affichage de la valeur actuelle de listOfData dans la console
        console.log(this.listOfData.value);
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }
}
