import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';


export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}


@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrl: './register-store.component.css'
})
export class RegisterStoreComponent {

  RegisterForm:FormGroup;
  loader:boolean = false

  constructor(private fb:FormBuilder){

    this.RegisterForm =  this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number_1: ['',[Validators.required, Validators.minLength(10)]],
      phone_number_2: ['',Validators.minLength(10)],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      description: ['',[Validators.required,Validators.minLength(100)]],
      location: ['', Validators.required,],
      facebook_link: [''],
      whatsapp_link: ['',[Validators.required,Validators.minLength(10)]],
      is_active: [true],
      can_evaluate: [false],
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    })

  }

  onSubmit(){



  }
}
