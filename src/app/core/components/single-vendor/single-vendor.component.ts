import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotifcationsService } from '../../services/others/notifcations.service';

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
  @Input() id!:string;

  constructor(private notificationService:NotifcationsService) {

  }

  subscribeSHop(shop:string):void {

    this.notificationService.subscribeToShop( true,shop);

  }
}
