import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/shared/header/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { PullToRefreshComponent } from './core/pages/content/pull-to-refresh/pull-to-refresh.component';
import { registerLocaleData, ViewportScroller } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { fadeInAnimation } from './core/router-animation/router-animation';
// Register French locale data
registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent,ToastrModule, PullToRefreshComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInAnimation] // Déclarez l'animation ici
})
export class AppComponent {
  title = 'babyStore';

  constructor(private router: Router,private viewScroller: ViewportScroller) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Action à exécuter une fois que la navigation est terminée
        //this.viewScroller.scrollToPosition([0, 0]);
        //window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
