import { CommonModule, DOCUMENT, isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2, ViewChild, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EcommerceService } from "../../../services/others/ecommerce.service";
import { ApiService } from "../../../services/api.service";
import { ICategory } from "../../../interfaces/Icategory";
import { BehaviorSubject } from "rxjs";
import { PullToRefreshComponent } from "../../../pages/content/pull-to-refresh/pull-to-refresh.component";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, PullToRefreshComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css' // Corrected the property name
})
export class MobileMenuComponent {

  @ViewChild('offCanvasNav') offCanvasNav!: ElementRef;
  ecomService=inject(EcommerceService)
  listOfData = new BehaviorSubject<ICategory[]>([]);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    public ecommService:EcommerceService
  ) {


  }

  ngAfterViewInit(): void {
    const menuItems = this.offCanvasNav.nativeElement.querySelectorAll('a');
    menuItems.forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => {
        this.tooggleClose()
      });
    });

    if (isPlatformBrowser(this.platformId)) {
      this.activeMobileMenu();
    }


  }

  tooggleClose(){
    this.ecomService.searchVisible.set(false)
  }


  selectItem(){
    const container = this.document.querySelector('.mobile-header-wrapper-style'); // Sélection de l'élément contenant la classe à modifier
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.ecommService.getCategory()
    this.ecommService.listOfCategory.subscribe(
      (data) => {
        this.listOfData.next(data);
      }
    )
  }

  activeMobileMenu(){

    var $offCanvasNav = $(".mobile-menu"),
        $offCanvasNavSubMenu = $offCanvasNav.find(".dropdown");

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /* Category Sub Menu Toggle */
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e:any) {
      const $this = $(this);
      if (
        $this.parent().hasClass("menu-item-has-children") ||
        $this.parent().hasClass("has-children") ||
        $this.parent().hasClass("has-sub-menu")
      ) {
        e.preventDefault();
        if ($this.siblings("ul:visible").length) {
          $this.parent("li").removeClass("active");
          $this.siblings("ul").slideUp();
        } else {
          $this.parent("li").addClass("active");
          $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
          $this.closest("li").siblings("li").find("ul:visible").slideUp();
          $this.siblings("ul").slideDown();
        }
      }
    });

  }


}
