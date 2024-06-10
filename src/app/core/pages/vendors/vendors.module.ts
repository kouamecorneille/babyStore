import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorComponent } from './vendor/vendor.component';
import { LayoutComponent } from './layout/layout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductsComponent } from './add-products/add-products.component';


@NgModule({
  declarations: [VendorComponent,LayoutComponent,DashbordComponent,SettingsComponent,ProductsListComponent,AddProductsComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    RouterModule

  ]
})
export class VendorsModule { }
