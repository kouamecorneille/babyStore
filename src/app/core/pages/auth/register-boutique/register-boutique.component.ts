import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-boutique',
  templateUrl: './register-boutique.component.html',
  styleUrl: './register-boutique.component.css'
})
export class RegisterBoutiqueComponent {

  twostep:boolean = false;
  shopForm: FormGroup;
  logo:any

  constructor(private formBuilder: FormBuilder, private apiService:ApiService, private toastr:ToastrService) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      // logo: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number_1: ['',[Validators.required, Validators.minLength(10)]],
      phone_number_2: ['',Validators.minLength(10)],
      description: ['',[Validators.required,Validators.minLength(100)]],
      location: [''],
      facebook_link: [''],
      whatsapp_link: ['',[Validators.required,Validators.minLength(10)]],
      is_active: [true],
      can_evaluate: [false],
    });
  }



  ngOnInit(): void {



  }


  goToStep(){

    this.twostep = true;
  }

  OnSelectLogo(event:any){

    console.log(event.target.files[0]);
    if(event){

      const logo = event.target.files[0]

      this.logo = logo
    }

  }

  onSubmit(){

    const form = new FormData()

    form.append('name',this.shopForm.value.name)
    form.append('logo', this.logo)
    form.append('email',this.shopForm.value.email)
    form.append('phone_number_1',this.shopForm.value.phone_number_1)
    form.append('phone_number_2',this.shopForm.value.phone_number_2)
    form.append('description',this.shopForm.value.description)
    form.append('location',this.shopForm.value.location)
    form.append('facebook_link',this.shopForm.value.facebook_link)
    form.append('whatsapp_link',this.shopForm.value.whatsapp_link)
    this.apiService.postItem(form, 'shops').subscribe(
      (response:any) => {

        if(response){

          this.toastr.success('La boutique a bien été créer avec succès !', 'Création de boutique');

        }
      },
      (error:any) => {

      }
    )


  }
}
