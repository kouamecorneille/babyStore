import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { Router } from '@angular/router';
import { UserApiResponse } from '../../../interfaces/Iuser';
import { CrytodataService } from '../../../services/crytodata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginForm!:FormGroup
  message!:string
  loader: boolean=false;
  //private authService:AuthenticateService
  constructor(private fb:FormBuilder, private authService:AuthenticateService, private toastr: ToastrService, private router:Router, private crypt:CrytodataService){

    this.LoginForm = this.fb.group({
      numero:["", [Validators.required, Validators.minLength(10)]],
      password:["", [Validators.required,Validators.minLength(6)]]
    })

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if( this.authService.isAuthenticatedUser()){

      this.router.navigate(['/hot-deals']);

    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  login() {
    if (this.LoginForm.valid) {
      this.loader = true;
      const data = {
        phone_number: this.LoginForm.value.numero,
        password: this.LoginForm.value.password
      };

      this.authService.login(data).subscribe(
        (response: UserApiResponse) => {
          if (response) {
            this.authService.isAuthenticate = true;
            const userData = response;

            localStorage.setItem('Djassa2Access', this.crypt.encryptData(userData.access));
            localStorage.setItem('Djassa2Refrech', this.crypt.encryptData(userData.refresh));
            localStorage.setItem('DjassaAuthUser', this.crypt.encryptData(userData.user));
            this.loader = false;

            this.toastr.success('Connexion réussie avec succès!', 'Succès !');

            // Redirect to the previous page if available, otherwise to the dashboard
            const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard';
            this.router.navigate([redirectUrl]);

            // Clear the redirect URL from local storage after navigation
            localStorage.removeItem('redirectUrl');
          }
        },
        (err: any) => {
          this.loader = false;
          console.log(err);
          if (err.status === 401) {
            this.toastr.error('Numéro ou mot de passe incorrect, réessayez encore !', 'Error');
          } else {
            this.toastr.error('Impossible de se connecter pour le moment !', 'Error');
          }
        }
      );
    } else {
      this.toastr.error('Veuillez remplir tous les champs du formulaire !', 'Error');
    }
  }
}
