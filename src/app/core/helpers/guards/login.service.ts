import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/auth/authenticate.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router:Router, private authService:AuthenticateService ,private toastr: ToastrService) { }

  canActivateFn():boolean{

    if(this.authService.isAuthenticatedUser()){

      return true;

    }else{

      this.toastr.error("Vous devez etre connecté pour accéder a cette page !", 'Connexion requis',{
        timeOut:4000
      });
      this.router.navigate(['/auth/login']);
      return false;

    }
  }
}
