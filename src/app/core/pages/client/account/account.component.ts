import { Component } from '@angular/core';
import { AuthenticateService } from '../../../services/auth/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/Iuser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})

export class AccountComponent {

  userSession: User | null;
  userForm: FormGroup;

  constructor(private authService: AuthenticateService, private fb: FormBuilder) {
    this.userSession = this.authService.getUser();

    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.setUserData()
  }

  setUserData(){

    this.userForm.patchValue({
      first_name:this.userSession?.first_name,
      last_name:this.userSession?.last_name,
      email:this.userSession?.email,
      phone_number:this.userSession?.phone_number,
    })
  }


  onSubmit(): void {
    if (this.userForm.valid) {


      // Logic to handle form submission goes here
    } else {
      console.log('Form is invalid');
    }
  }




}
