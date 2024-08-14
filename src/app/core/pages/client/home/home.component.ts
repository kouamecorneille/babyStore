import { Component } from '@angular/core';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { User } from '../../../interfaces/Iuser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userSession: User | null;
  constructor(private authService: AuthenticateService,) {
    this.userSession = this.authService.getUser();
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
