import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterBoutiqueComponent } from './register-boutique/register-boutique.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeadComponent } from '../../shared/header/head/head.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SendMailMessageComponent } from './send-mail-message/send-mail-message.component';
import { PasswordRessetConfirmComponent } from './password-resset-confirm/password-resset-confirm.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RegisterBoutiqueComponent,
    MainComponent,
    SendMailMessageComponent,
    PasswordRessetConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    HeadComponent,
    FooterComponent,
  ]
})
export class AuthenticationModule { }
