import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuickviewModalComponent } from '../quickview-modal/quickview-modal.component';
import { Product } from '../../interfaces/Iproduct';
import { CartService } from '../../services/others/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [RouterModule, QuickviewModalComponent, CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  @Input() product!: Product;

  constructor(private router: Router, private cartService: CartService,) {

  }


  goToDetails(item:Product){

    this.router.navigate(['/details-product', item.slug], {state: { scrollTop: 0 }});
  }

  addTocart(product: Product){

    this.cartService.addToCart(product)
  }

  addToWhishList(product: Product){

    this.cartService.addToWhishList(product)
  }



}
