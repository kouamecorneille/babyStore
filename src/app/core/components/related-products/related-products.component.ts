import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/Iproduct';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {

  @Input() products!: Product[];
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'

}
