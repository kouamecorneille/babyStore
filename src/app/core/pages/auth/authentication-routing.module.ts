import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import {RegisterBoutiqueComponent} from './register-boutique/register-boutique.component'
import { MainComponent } from './main/main.component';
import { SendMailMessageComponent } from './send-mail-message/send-mail-message.component';
import { PasswordRessetConfirmComponent } from './password-resset-confirm/password-resset-confirm.component';

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
      },
      {
        path:"email-success-message",
        component:SendMailMessageComponent
      },
      {
        path: "reset-password/:uid/:token",
        component: PasswordRessetConfirmComponent,
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
