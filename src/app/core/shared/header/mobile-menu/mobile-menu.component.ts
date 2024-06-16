import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EcommerceService } from "../../../services/others/ecommerce.service";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css' // Corrected the property name
})
export class MobileMenuComponent {

  @ViewChild('offCanvasNav') offCanvasNav!: ElementRef;
  ecomService=inject(EcommerceService)

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const menuItems = this.offCanvasNav.nativeElement.querySelectorAll('a');
    const container = this.document.querySelector('.mobile-header-wrapper-style'); // Sélection de l'élément contenant la classe à modifier
    menuItems.forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => {
        // this.renderer.removeClass(container, 'search-visible');
        this.tooggleClose()
        // this.renderer.addClass(this.document.body, 'mobile-menu-active');
      });
    });

    // const endTrigger = this.document.querySelector('.mobile-menu-close');
    // if (endTrigger) {
    //   this.renderer.listen(endTrigger, 'click', () => {
    //     this.renderer.removeClass(this.document.body, 'mobile-menu-active'); // Corrected class name
    //     // Removed the redundant double quote in the class name below
    //     this.renderer.removeClass(container, 'search-visible');
    //   });
    // }
    
  }

  tooggleClose(){
    this.ecomService.searchVisible.set(false)
  }


  selectItem(){
    const container = this.document.querySelector('.mobile-header-wrapper-style'); // Sélection de l'élément contenant la classe à modifier

    
    
  }

}
