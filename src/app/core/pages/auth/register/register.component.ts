import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export interface Role {
  id: string;
  label: string;
}

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  RegisterForm: FormGroup
  confirmPassword!: string
  message!: string
  userRole!: string
  loader: boolean = false
  arrayNumber: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  securitycode: Number[] = []
  listOfRoles!: Role[]

  constructor(private fb: FormBuilder, private apiService: ApiService, private toastr: ToastrService, private router: Router) {
    this.RegisterForm = this.fb.group({
      nom: ["", Validators.required],
      prenoms: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]], // Validators should be an array
      numero: ["", [Validators.required, Validators.minLength(10)]], // Validators should be an array
      password: ["", Validators.required, Validators.minLength(6)],
      role: ["", Validators.required],
      delivery_adresse: ["", Validators.required],
      confirmPassword: ["", Validators.required, Validators.minLength(6)],
      acceptTerms: [false, Validators.requiredTrue]
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }


  ngOnInit(): void {

    //this.generateSecurityCode()
    this.getRoles()

  }

  generateSecurityCode() {

    for (let index = 0; index < 4; index++) {
      const code = Math.floor(Math.random() * this.arrayNumber.length);
      this.securitycode.push(code);
    }

  }



  getRoles(): void {

    this.apiService.getItems(`roles`).subscribe(
      (response: Role[]) => {
        // Check if response is valid and not empty
        if (response && response.length > 0) {
          // Filter out roles labeled as 'admin'
          this.listOfRoles = response.filter((role: Role) => role.label !== 'admin');
        } else {
          console.log('No roles found or empty response.');
        }
      },
      (err: any) => {
        console.error('Error fetching roles:', err);
      }
    )
  }

  onSubmit() {
    this.loader = true
    if(this.RegisterForm.valid){
      if (this.RegisterForm.value.password == this.RegisterForm.value.confirmPassword) {

        if (this.RegisterForm.value.password.length >= 6) {

            const data = {
              first_name: this.RegisterForm.value.nom,
              last_name: this.RegisterForm.value.prenoms,
              email: this.RegisterForm.value.email,
              delivery_adresse: this.RegisterForm.value.delivery_adresse,
              phone_number: this.RegisterForm.value.numero,
              password: this.RegisterForm.value.password,
              role: this.listOfRoles.find(role => role.label === 'client'),
            }

            this.apiService.postItem(data, "users/create/").subscribe(
              (response: any) => {
                if (response) {

                  const userData = response
                  localStorage.setItem('DjassaAuthUser', JSON.stringify(userData.user))
                  localStorage.setItem('Djassa2Access', userData.access)
                  localStorage.setItem('Djassa2Refrech', userData.refresh)
                  this.toastr.success('Votre compte a ete creer avec succes !', 'Error');

                  this.router.navigate(['/dashboard'])

                }else{

                  console.log("Error response :",response)

                }
              },
              (error: any) => {
                this.loader = false

                console.log("Error : ", error)

                if(error.error){
                  const err = error.error;
                  if (error.status == 400) {
                    if (err.email) {
                      this.toastr.error("Cette adresse e-mail existe déjà !", 'Erreur', {
                        timeOut: 5000
                      });
                    } else if (err.password) {
                      this.toastr.error("Le mot de passe dit contenir au moins 6 caractères !", 'Erreur', {
                        timeOut: 5000
                      });
                    } else if (err.phone_number) {
                      this.toastr.error("Le numéro de télephone existe déjà !", 'Erreur', {
                        timeOut: 5000
                      });
                    }
                  }

                }
              }
            )
        }else{
          this.loader = false
          this.toastr.error('Le mot de passe dit contenir au moins 6 caractères !', 'Error');
        }
      } else {
        this.loader = false
        this.toastr.error('Les mots de passe ne correspondent pas!', 'Error');
      }
    }else {
      this.loader = false
      this.toastr.error('Vueillez remplir tout les champs du formulaires !', 'Error');
    }
  }

}
