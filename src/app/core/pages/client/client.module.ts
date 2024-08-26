import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OdersComponent } from './oders/oders.component';
import { TrackOrdersComponent } from './track-orders/track-orders.component';
import { AccountComponent } from './account/account.component';
import { HeadComponent } from '../../shared/header/head/head.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { CorePipesModule } from '../../helpers/pipes/pipes.module';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { NotifcationsService } from '../../services/others/notifcations.service';

@NgModule({
  declarations: [
    DashbordComponent,
    HomeComponent
    ,SidebarComponent,
    OdersComponent,
    TrackOrdersComponent,
    AccountComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    BreadcrumbComponent,
    RouterModule,
    HeadComponent,
    FooterComponent,
    ReactiveFormsModule, // Add here
    CorePipesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    NotifcationsService
  ],
})

export class ClientModule { }


