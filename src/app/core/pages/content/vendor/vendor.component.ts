import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../../../interfaces/Ishop';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {

  listOfVendors = new BehaviorSubject<Store[]>([])
  listOfLoader = [0,1,2,3,5,6,7,8,9,10,11,12]

  constructor(private apiService:ApiService) {

  }

  ngOnInit(): void {

    this.getListOfVendors()


  }

  getListOfVendors(){


    this.apiService.getItems(`shops`).subscribe(
      (response:Store[]) => {

        console.log(response)

        if(response){
         setTimeout(()=>{
          this.listOfVendors.next(response);
         }, 1000)

        }
      },
      (err:any)=>{

        console.log(err)
      }
    )

  }



}
