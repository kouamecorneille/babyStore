import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  PasswordForm!:FormGroup
  message!:string

  constructor(private fb:FormBuilder){

    this.PasswordForm = this.fb.group({
      email:['', [Validators.required,Validators.email]]
    })

  }

}
