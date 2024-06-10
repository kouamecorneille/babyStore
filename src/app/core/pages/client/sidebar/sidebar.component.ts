import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/auth/authenticate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  router = inject(Router);

  constructor(private authService: AuthenticateService,) {

  }


  Logout(){

    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
