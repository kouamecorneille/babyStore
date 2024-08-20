import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {


  private mobileWidth = 768; // Définir une largeur maximale pour les mobiles
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  public isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  private checkViewport(): void {
    const isMobile = window.innerWidth <= this.mobileWidth;
    this.isMobileSubject.next(isMobile);
  }

}
