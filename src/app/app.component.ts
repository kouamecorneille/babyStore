import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/shared/header/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { PullToRefreshComponent } from './core/pages/content/pull-to-refresh/pull-to-refresh.component';
import { registerLocaleData, ViewportScroller } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { fadeInAnimation } from './core/router-animation/router-animation';
import { SwUpdate } from '@angular/service-worker';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
// Step 1: Add the following line...
import { register } from 'swiper/element/bundle';
import { UpdateService } from './core/services/others/update.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
// Step 2: Add the following line...
register();
// Register French locale data
registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    ToastrModule,

    //     // for Router use:
    LoadingBarRouterModule,//
    // for HttpClient use:
    LoadingBarHttpClientModule,
    LoadingBarModule,
    PullToRefreshComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInAnimation] // Déclarez l'animation ici
})
export class AppComponent {
  title = 'babyStore';
  updateService = inject(UpdateService)

  constructor(private router: Router,private viewScroller: ViewportScroller,private swUpdate: SwUpdate) {

  }

  ngOnInit() {
    // Réinitialiser l'indicateur après le rechargement

    // Gérer les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Action à exécuter une fois que la navigation est terminée
        this.viewScroller.scrollToPosition([0, 0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.updateService.checkForUpdates();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngAfterViewInit(): void {
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      document?.querySelector("[name=viewport]")?.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1")
    }
  }
}
