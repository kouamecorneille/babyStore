import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

    @ViewChild('contentWrapper') contentWrapper!: ElementRef;
    year = new Date().getFullYear()


  constructor(private elRef: ElementRef, private renderer: Renderer2, private themeService: ThemeService) {}

  ngOnInit(): void {


  }



  ngAfterViewInit() {
    // const $ = window['jQuery']; // Accéder à jQuery globalement

    $(this.elRef.nativeElement)
      .find('.menu-item.has-submenu .menu-link')
      .on('click', (event:any) => {
        event.preventDefault();
        const $this = $(event.currentTarget);
        const submenu = $this.next('.submenu');

        if (submenu.is(':hidden')) {
          $('.has-submenu').not($this.parent()).find('.submenu').slideUp(200);
        }

        submenu.slideToggle(200);
      });

    $('[data-trigger]').on('click', (event:any) => {
      event.preventDefault();
      event.stopPropagation();
      const target = $(event.currentTarget).attr('data-trigger');
      if(target){
        $(target).toggleClass('show');
        $('body').toggleClass('offcanvas-active');
        $('.screen-overlay').toggleClass('show');
      }
    });

    $(this.elRef.nativeElement)
      .find('.screen-overlay, .btn-close')
      .click((event:any) => {
        $('.screen-overlay').removeClass('show');
        $('.mobile-offcanvas, .show').removeClass('show');
        $('body').removeClass('offcanvas-active');
      });

      $(this.elRef.nativeElement)
        .find('.btn-aside-minimize')
        .on('click', () => {
          const targetDiv = $('.body'); // Remplacez 'your-specific-div' par la classe de votre div cible
          if (window.innerWidth < 768) {

            $('.body').removeClass('aside-mini');
            $('.screen-overlay').removeClass('show');
            $('.navbar-aside').removeClass('show');
            $('.body').removeClass('offcanvas-active');

          } else {
            // $('body').toggleClass('aside-mini');
            targetDiv.toggleClass('aside-mini');
          }
        });

      if (this.elRef.nativeElement.querySelector('#offcanvas_aside')) {
        const offcanvas = this.elRef.nativeElement.querySelector('#offcanvas_aside');
        // Utiliser PerfectScrollbar si vous avez correctement importé et configuré PerfectScrollbar dans votre projet Angular
        new PerfectScrollbar(offcanvas);
      }
    }

    toggleTheme(): void {
      this.themeService.toggleMode(this.contentWrapper.nativeElement);
    }





}










