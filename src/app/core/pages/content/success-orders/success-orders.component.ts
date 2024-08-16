import { Component, inject } from '@angular/core';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { CartService } from '../../../services/others/cart.service';

@Component({
  selector: 'app-success-orders',
  templateUrl: './success-orders.component.html',
  styleUrls: ['./success-orders.component.css']
})
export class SuccessOrdersComponent {

  public ecommerceService = inject(EcommerceService);
  public cartService = inject(CartService);
  totalCheckout: number = 0;
  today:number;

  constructor() {
    this.today = Date.now()
  }

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalCheckout = this.cartService.cartItemsSignalSummary().reduce((total, item) => {
      const price = parseFloat(item.product.reduced_price ? item.product.reduced_price : item.product.price);
      return total + price * item.quantity;
    }, 0);
  }

  Sum(quantity: string, price: number): number {
    const quantityInt = parseInt(quantity);
    return quantityInt * price;
  }

  ngOnDestroy(){

    this.cartService.cartItemsSignalSummary.set([])
  }
}
