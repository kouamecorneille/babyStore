import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { User } from '../../../interfaces/Iuser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  router = inject(Router);
  userSession: User | null;

  constructor(private authService: AuthenticateService,) {

    this.userSession = this.authService.getUser();

  }


  Logout(){

    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

   // Method to generate username color based on a simple hashing algorithm
   getUsernameColor(username: string): string {
    const hash = username.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const r = (hash * 7) % 255;
    const g = (hash * 13) % 255;
    const b = (hash * 17) % 255;
    return `rgb(${r}, ${g}, ${b})`;
  }
}
