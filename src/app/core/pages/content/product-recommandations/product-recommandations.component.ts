import { Component, inject } from '@angular/core';
import { EcommerceService } from '../../../services/others/ecommerce.service';

@Component({
  selector: 'app-product-recommandations',
  templateUrl: './product-recommandations.component.html',
  styleUrl: './product-recommandations.component.css',
  host:{ngSkipHydration:'true'}
})
export class ProductRecommandationsComponent {

  ecomService = inject(EcommerceService);
  listOfLoader = [0,1,2,3,5,6,7,8,9,10]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ecomService.getAllProducts()
  }
}
