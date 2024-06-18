import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EcommerceService } from '../../../services/others/ecommerce.service';

@Component({
  selector: 'app-pull-to-refresh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pull-to-refresh.component.html',
  styleUrl: './pull-to-refresh.component.css'
})
export class PullToRefreshComponent {


  pStart = { x: 0, y: 0 };
  pStop = { x: 0, y: 0 };
  ecomService = inject(EcommerceService)

  constructor() {
    document.addEventListener("touchstart", (e) => { this.swipeStart(e) });
    document.addEventListener("touchend", (e) => { this.swipeEnd(e) });
   }

  ngOnInit() {

  }

  swipeStart(e: any) {
    if (typeof e["targetTouches"] !== "undefined") {
      const touch = e.targetTouches[0];
      this.pStart.x = touch.screenX;
      this.pStart.y = touch.screenY;
    } else {
      this.pStart.x = e.screenX;
      this.pStart.y = e.screenY;
    }
  }

  swipeEnd(e: any) {
    if (typeof e["changedTouches"] !== "undefined") {
      const touch = e.changedTouches[0];
      this.pStop.x = touch.screenX;
      this.pStop.y = touch.screenY;
    } else {
      this.pStop.x = e.screenX;
      this.pStop.y = e.screenY;
    }

    this.swipeCheck();
  }

  swipeCheck() {
    const changeY = this.pStart.y - this.pStop.y;
    const changeX = this.pStart.x - this.pStop.x;
    if (this.isPullDown(changeY, changeX)) {
      // do something to refresh / call apis to refresh data

      setTimeout(() => {
          this.ecomService.isRefreshing.set(true)
          this.refreshPage();
          },
        2000
      );
    }
  }

  isPullDown(dY: number, dX: number) {
    // methods of checking slope, length, direction of line created by swipe action
    return (
      dY < 0 &&
      ((Math.abs(dX) <= 100 && Math.abs(dY) >= 100) ||
        (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
    );
  }

  ngOnDestroy(): void {
    document.removeEventListener('touchstart', (e) => { this.swipeStart(e); });
    document.removeEventListener("touchend", (e) => { this.swipeEnd(e); });
  }


  refreshPage() {
    // Actualiser la page
    window.location.reload();
  }

}
