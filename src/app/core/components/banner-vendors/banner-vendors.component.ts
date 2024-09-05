import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '../../interfaces/Ishop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotifcationsService } from '../../services/others/notifcations.service';

@Component({
  selector: 'app-banner-vendors',
  standalone: true,
  imports: [CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './banner-vendors.component.html',
  styleUrl: './banner-vendors.component.css'
})
export class BannerVendorsComponent {

  @Input() vendor!:Store

  loader = false


  constructor(private notificationService:NotifcationsService) {
    setTimeout(() => {

      this.loader = true;

    },3000)
  }


  subscribeSHop(shop:string):void {

    this.notificationService.subscribeToShop( true,shop);

  }
}
