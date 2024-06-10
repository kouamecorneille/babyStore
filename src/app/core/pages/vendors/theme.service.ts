import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {}

  toggleMode(element: HTMLElement): void {
    if (element.classList.contains('dark')) {
      this.toggleLightMode(element);
    } else {
      this.toggleDarkMode(element);
    }
  }

  private toggleDarkMode(element: HTMLElement): void {
    element.classList.remove('light');
    element.classList.add('dark');
    localStorage.setItem('mode', 'dark');
  }

  private toggleLightMode(element: HTMLElement): void {
    element.classList.remove('dark');
    element.classList.add('light');
    localStorage.setItem('mode', 'light');
  }






}
