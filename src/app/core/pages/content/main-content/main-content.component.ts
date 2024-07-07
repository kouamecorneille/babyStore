import { Component, OnInit } from '@angular/core';
import { Router, Event, Scroll, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    // Disable automatic scroll restoration to avoid race conditions
    this.viewportScroller.setHistoryScrollRestoration('manual');
  }

  ngOnInit() {
    console.log("Scroll to position", "current.position");
    this.handleScrollOnNavigation();
  }

  private handleScrollOnNavigation(): void {
    this.router.events.pipe(
      filter((e: Event): e is Scroll => e instanceof Scroll || e instanceof NavigationEnd), // Filtre les événements pour ne garder que ceux de type Scroll ou NavigationEnd
      pairwise() // Regroupe les événements par paires successives (précédent et courant)
    ).subscribe((events: [Event, Event]) => {
      const previous = events[0] as Scroll;
      const current = events[1] as Scroll;

      if (current instanceof Scroll) {
        if (current.position) {
          // Navigation arrière (Backward navigation)
          console.log("Scroll to position", current.position);
          this.viewportScroller.scrollToPosition(current.position); // Fais défiler jusqu'à la position précédente
        } else if (current.anchor) {
          console.log("Scroll to anchor", current.anchor);
          this.viewportScroller.scrollToPosition([0, 0]);
          // Navigation par ancre (Anchor navigation)
          this.viewportScroller.scrollToAnchor(current.anchor); // Fais défiler jusqu'à l'ancre spécifiée
        } else {
          // Vérifie si les routes correspondent ou s'il s'agit seulement d'un changement de paramètre de requête
          if (this.getBaseRoute(previous.routerEvent.url) !== this.getBaseRoute(current.routerEvent.url)) {
            // Les routes ne correspondent pas, il s'agit d'une navigation en avant
            // Comportement par défaut : défiler vers le haut
            console.log("Scroll to top of the page");
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        }
      }
    });
  }

  private getBaseRoute(url: string): string {
    // return url without query params
    return url.split('?')[0];
  }
}
