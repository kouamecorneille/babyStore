import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { OsDetectionService } from '../../../services/others/os-detection.service';

@Component({
  selector: 'app-pull-to-refresh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.css']
})
export class PullToRefreshComponent {

  pStart = { x: 0, y: 0 };
  pStop = { x: 0, y: 0 };

  ecomService = inject(EcommerceService);

  private startY: number = 0;
  isIphone: boolean = false;

  constructor(private elementRef: ElementRef, private osDetectionService: OsDetectionService) {}

  ngOnInit(): void {
    this.isIphone = this.osDetectionService.detectOS() === 'iOS';
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (this.elementRef.nativeElement.scrollTop === 0) {
      this.startY = event.touches[0].clientY;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const currentY = event.touches[0].clientY;

    if (!this.ecomService.isRefreshing() && currentY > this.startY + 100) {
      this.ecomService.isRefreshing.set(true);
      this.refresh();
    }
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    this.ecomService.isRefreshing.set(false);
  }

  private refresh(): void {

    setTimeout(() => {
      window.location.reload();
      this.ecomService.isRefreshing.set(false);
    }, 2000);
  }
}
