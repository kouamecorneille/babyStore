import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ICategory } from '../../interfaces/Icategory';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Shopcategorie } from '../../interfaces/IShopCategorie';

@Component({
  selector: 'app-vendors-categories',
  standalone: true,
  imports: [RouterModule,CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './vendors-categories.component.html',
  styleUrl: './vendors-categories.component.css'
})
export class VendorsCategoriesComponent {

  @Input() categorie!:Shopcategorie[];

}
