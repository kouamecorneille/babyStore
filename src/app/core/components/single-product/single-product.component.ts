import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuickviewModalComponent } from '../quickview-modal/quickview-modal.component';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [RouterModule, QuickviewModalComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

}
