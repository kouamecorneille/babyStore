import { Directive, HostListener } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Directive({
  selector: '[appMenuClick]'
})
export class MenuClickDirective {

  constructor(private menuService: MenuService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.menuService.removeBodyClass('mobile-menu-active');
  }
}
