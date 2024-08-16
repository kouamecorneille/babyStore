import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  PasswordForm!:FormGroup
  message!:string
  loading:boolean = false
  router = inject(Router)
  authService = inject(AuthenticateService)

  constructor(private fb:FormBuilder, private apiService:ApiService,private toastr: ToastrService,){

    this.PasswordForm = this.fb.group({
      email:['', [Validators.required,Validators.email]]
    })

  }


  onSubmit() {

    this.loading = true

    const data ={
      email:this.PasswordForm.value.email,
    }

    //garder l'email de l'utilisateur en session
    this.authService.userEmailReinitialized.set(this.PasswordForm.value.email)
    this.apiService.postItem(data, 'users/password-reset/').subscribe(
      (response:any) => {

        if(response){
          this.loading = false;
          this.toastr.success('Mail envoyé avec succès  !', 'Succès !');

          this.router.navigate(['/auth/email-success-message'])
        }
      },
      (error:any) => {
        this.loading = false;
        console.log(error);
        if(error.status == 404 || 400) {

          this.toastr.error('Aucun compte trouvé pour cet email !', 'Erreur !');

        }
      }

    )


  }

}
