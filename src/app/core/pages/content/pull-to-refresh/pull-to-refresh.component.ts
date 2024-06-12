import { Component } from '@angular/core';

@Component({
  selector: 'app-pull-to-refresh',
  standalone: true,
  imports: [],
  templateUrl: './pull-to-refresh.component.html',
  styleUrl: './pull-to-refresh.component.css'
})
export class PullToRefreshComponent {

  tems: string[] = [];
  isRefreshing = false;
  touchStartY = 0;
  touchMoveY = 0;

  constructor() { }

  ngOnInit() {

  }



  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    this.touchMoveY = event.touches[0].clientY;
    const pullDistance = this.touchMoveY - this.touchStartY;

    if (pullDistance > 50) {
      this.isRefreshing = true;
    }
  }

  onTouchEnd() {
    if (this.isRefreshing) {
      this.refreshPage();
    }

    this.isRefreshing = false;
    this.touchStartY = 0;
    this.touchMoveY = 0;
  }

  refreshPage() {
    // Actualiser la page
    window.location.reload();
  }

}
