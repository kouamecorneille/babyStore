import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/shared/header/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { PullToRefreshComponent } from './core/pages/content/pull-to-refresh/pull-to-refresh.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// Register French locale data
registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent,ToastrModule, PullToRefreshComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'babyStore';
  constructor(private router: Router) {}

  // ngOnInit() {
  //   this.router.events.pipe(
  //     // RxJS operators go here
  //   ).subscribe()
  // }
}
