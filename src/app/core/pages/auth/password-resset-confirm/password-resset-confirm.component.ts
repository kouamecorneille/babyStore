import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-resset-confirm',
  templateUrl: './password-resset-confirm.component.html',
  styleUrl: './password-resset-confirm.component.css'
})
export class PasswordRessetConfirmComponent {

  PasswordForm!:FormGroup
  message!:string
  loading:boolean = false
  activatedRoute = inject(ActivatedRoute)
  token:string = '';

  constructor(private fb:FormBuilder, private apiService:ApiService){


    this.token = this.activatedRoute.snapshot.paramMap.get('token')!;

    this.PasswordForm = this.fb.group({
      password:['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['', [Validators.required,Validators.minLength(6)]],
    })


  }


  onSubmit() {

    this.loading = true

    const data ={
      token:this.token,
      new_password:this.PasswordForm.value.password
    }

    this.apiService.postItem(data, 'users/password-reset').subscribe(
      (response:any) => {

        if(response){


        }
      },
      (error:any) => {

        if(error.status == 404 || 400) {


        }
      }

    )


  }

}
