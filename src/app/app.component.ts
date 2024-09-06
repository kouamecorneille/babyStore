import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/shared/header/loader/loader.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PullToRefreshComponent } from './core/pages/content/pull-to-refresh/pull-to-refresh.component';
import { CommonModule, registerLocaleData, ViewportScroller } from '@angular/common';
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

import { Platform } from '@angular/cdk/platform';
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
    CommonModule,
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
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;
  isOnline: boolean = navigator.onLine;  // Vérifie l'état de la connexion au chargement
  hasCheckedInitialConnection: boolean = false;  // Sert à éviter la notification initiale

  constructor(private router: Router,private platform: Platform,private toastr: ToastrService,private viewScroller: ViewportScroller,private swUpdate: SwUpdate) {
    this.isOnline = false;

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
    });

    window.addEventListener('load', () => {
      const url = new URL(window.location.href);
      const path = url.pathname;

      // Utiliser le routeur Angular pour rediriger vers le chemin correct
      this.router.navigateByUrl(path);
    })


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
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));

    // Vérification initiale de l'état de connexion sans afficher de notification
    this.checkInitialConnection();

    this.loadModalPwa();

  }

   // Méthode pour mettre à jour l'état de la connexion
   private updateOnlineStatus(notify: boolean = true): void {
    const currentOnlineStatus = window.navigator.onLine;  // État actuel de la connexion

    // Si l'utilisateur est déjà sur l'app, on évite de notifier le statut initial
    if (this.hasCheckedInitialConnection) {
      if (notify && currentOnlineStatus !== this.isOnline) {
        // Si la connexion change, on affiche la notification
        if (currentOnlineStatus) {
          this.toastr.success('Connexion restaurée avec succès!', 'Succès !');
        } else {
          this.toastr.error('Échec de connexion à Internet !', 'Erreur de connexion');
        }
      }
    } else {
      // Première fois qu'on vérifie la connexion
      this.hasCheckedInitialConnection = true;
    }

    // Mise à jour de l'état de la connexion
    this.isOnline = currentOnlineStatus;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }


  ngAfterViewInit(): void {
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      document?.querySelector("[name=viewport]")?.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1")
    }
  }


   // Méthode appelée uniquement au chargement pour l'état initial de la connexion
  private checkInitialConnection(): void {
    this.isOnline = navigator.onLine;
    this.hasCheckedInitialConnection = true;
  }

  // Méthode appelée lors du passage en ligne
  private handleOnline(): void {
    if (this.hasCheckedInitialConnection && !this.isOnline) {
      this.isOnline = true;
      this.toastr.success('Connexion restaurée avec succès!', 'Succès !');
    }
  }

  // Méthode appelée lors du passage hors ligne
  private handleOffline(): void {
    if (this.hasCheckedInitialConnection && this.isOnline) {
      this.isOnline = false;
      this.toastr.error('Échec de connexion à Internet !', 'Erreur de connexion');
    }
  }

  // Nettoyage des événements lorsque le composant est détruit
  ngOnDestroy(): void {
    window.removeEventListener('online', this.handleOnline.bind(this));
    window.removeEventListener('offline', this.handleOffline.bind(this));
  }
}
