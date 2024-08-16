import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../../../interfaces/Ishop';
import { EcommerceService } from '../../../services/others/ecommerce.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {

  listOfVendors = new BehaviorSubject<Store[]>([])
  searchVendors = new BehaviorSubject<Store[]>([])
  listOfLoader = [0,1,2,3,5,6]
  searchTerm:string = '';
  loading:boolean = false
  public ecommerceService = inject(EcommerceService)
  allVendors: Store[] = []; // To store all vendors
  paginatedVendors = new BehaviorSubject<Store[]>([]); // To store vendors for the current page
  currentPage: number = 1;  // Tracks the current page
  pageSize: number = 2;    // Number of items per page
  totalItems: number = 0;   // Total number of items

  constructor(private apiService:ApiService) {

  }

  ngOnInit(): void {

    this.ecommerceService.getListOfVendors()
    this.getListOfVendors()

  }

  searchStore(){

    if(this.searchTerm && this.searchTerm.length >=4){

      this.ecommerceService.searchStore(this.searchTerm).subscribe(
        (response:Store[])=>{

          if(response){

            this.searchVendors.next(response);

          }
        }
      )

    }

  }

  getListOfVendors(){


    this.apiService.getItems(`shops`).subscribe(
      (response:Store[]) => {


        if(response){

          this.listOfVendors.next(response);
          this.totalItems = this.ecommerceService.listOfStores.value.length;
          this.updatePaginatedVendors(); // Mettre à jour les vendeurs paginés

        }
      },
      (err:any)=>{

        console.log(err)
      }
    )

  }

  updatePaginatedVendors() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ecommerceService.listOfStores.next(this.ecommerceService.listOfStores.value.slice(startIndex, endIndex));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedVendors();
  }



}
