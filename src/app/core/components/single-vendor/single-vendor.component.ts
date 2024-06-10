import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-vendor',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './single-vendor.component.html',
  styleUrl: './single-vendor.component.css'
})
export class SingleVendorComponent {

  @Input() logourl!:string;
  @Input() numberOfProduct!:string;
  @Input() joineddate!:string;
  @Input() nameBoutique!:string;
  @Input() adresse!:string;
  @Input() numero!:string;
  @Input() slug!:string;


}
