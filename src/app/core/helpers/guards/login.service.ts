import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/auth/authenticate.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private authService: AuthenticateService,
    private toastr: ToastrService
  ) { }

  canActivateFn(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      this.toastr.error(
        'Vous devez être connecté pour accéder à cette page !',
        'Connexion requise',
        { timeOut: 4000 }
      );

      // Store the current URL for redirecting after login
      localStorage.setItem('redirectUrl', this.router.url);

      // Redirect to the login page
      this.router.navigate(['/auth/login']);

      return false;
    }
  }
}
