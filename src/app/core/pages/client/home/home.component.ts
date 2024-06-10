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
}
