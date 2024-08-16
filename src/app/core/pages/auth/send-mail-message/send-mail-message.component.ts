import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-send-mail-message',
  templateUrl: './send-mail-message.component.html',
  styleUrl: './send-mail-message.component.css'
})
export class SendMailMessageComponent {

  PasswordForm!:FormGroup
  message!:string
  loading:boolean = false

  constructor(private fb:FormBuilder, private apiService:ApiService){

    this.PasswordForm = this.fb.group({
      email:['', [Validators.required,Validators.email]]
    })

  }


  onSubmit() {

    this.loading = true

    const data ={
      email:this.PasswordForm.value.email,
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
