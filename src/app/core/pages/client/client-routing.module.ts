import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { OdersComponent } from './oders/oders.component';
import { TrackOrdersComponent } from './track-orders/track-orders.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from '../../helpers/guards/auth.guard';
import { PasswordChangeComponent } from './password-change/password-change.component';

const routes: Routes = [
  {
    path:"",
    component:DashbordComponent,
    children:[
      {
        path:'',
        component:HomeComponent,
        // canActivate:[AuthGuard],
      },
      {
        path:'orders',
        component:OdersComponent,
        // canActivate:[AuthGuard],
      },
      {
        path:'track-orders',
        component:TrackOrdersComponent,
        // canActivate:[AuthGuard],
      },
      {
        path:'account-detail',
        component:AccountComponent,
        // canActivate:[AuthGuard],
      },
      {
        path:'password-change',
        component:PasswordChangeComponent,
        // canActivate:[AuthGuard],
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule { }
