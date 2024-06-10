import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-vendors',
  standalone: true,
  imports: [],
  templateUrl: './banner-vendors.component.html',
  styleUrl: './banner-vendors.component.css'
})
export class BannerVendorsComponent {

  @Input() logo!:string;
  @Input() shopName!:string;
  @Input() bannerImage!:string
  @Input() description!:string
  @Input() number!:string
  @Input() adresse!:string


}
