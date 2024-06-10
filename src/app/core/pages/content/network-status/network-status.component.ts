import { Component } from '@angular/core';
import { NetworkStatusService } from '../../../services/network-status.service';

@Component({
  selector: 'app-network-status',
  standalone: true,
  imports: [],
  templateUrl: './network-status.component.html',
  styleUrl: './network-status.component.css'
})
export class NetworkStatusComponent {

  isOnline!: boolean;

  constructor(private networkStatusService: NetworkStatusService) { }

  ngOnInit() {
    this.networkStatusService.isOnline.subscribe(status => this.isOnline = status);
  }


}
