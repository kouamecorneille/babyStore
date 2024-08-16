import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import {RegisterBoutiqueComponent} from './register-boutique/register-boutique.component'
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:"auth",
    redirectTo:'auth/login',
    pathMatch:"full"
  },
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:"login",
        component:LoginComponent,
      },
      {
        path:"register",
        component:RegisterComponent,
      },
      {
        path:"forgot-password",
        component:ForgotPasswordComponent
      },
      {
        path:"register-boutique",
        component:RegisterBoutiqueComponent
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
