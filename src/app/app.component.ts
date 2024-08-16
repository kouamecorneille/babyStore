import { Component } from '@angular/core';
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
    PullToRefreshComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInAnimation] // Déclarez l'animation ici
})
export class AppComponent {
  title = 'babyStore';

  constructor(private router: Router,private viewScroller: ViewportScroller,private swUpdate: SwUpdate) {

  }

  ngOnInit() {
    // Réinitialiser l'indicateur après le rechargement
    localStorage.removeItem('updateApplied');

    // Gérer les événements de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Action à exécuter une fois que la navigation est terminée
        this.viewScroller.scrollToPosition([0, 0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Vérifier si les mises à jour du service worker sont activées
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        const updateApplied = localStorage.getItem('updateApplied');

        if (!updateApplied) {
          if (confirm("Nouvelle version disponible. Charger la nouvelle version ?")) {
            // Marquez que la mise à jour a été appliquée
            localStorage.setItem('updateApplied', 'true');
            // Activer immédiatement le nouveau service worker
            this.swUpdate.activateUpdate().then(() => {
              // Nettoyer les caches pour ne conserver que la nouvelle version
              if ('caches' in window) {
                caches.keys().then((keyList) => {
                  return Promise.all(keyList.map((key) => caches.delete(key)));
                }).then(() => {
                  // Recharger la page pour appliquer la nouvelle version
                  window.location.reload();
                });
              } else {
                // Recharger la page si l'API caches n'est pas disponible
                  location.reload();
              }
            });
          }
        }
      });
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
