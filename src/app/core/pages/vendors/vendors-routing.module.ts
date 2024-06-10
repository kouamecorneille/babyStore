import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { LayoutComponent } from './layout/layout.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path: 'home',
        component:DashbordComponent
      },
      {
        path: 'settings',
        component:SettingsComponent
      },
      {
        path: 'add-product',
        component:AddProductsComponent
      },
      {
        path: 'list-of-products',
        component:ProductsListComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
