import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

export interface banner{
  img:string,
  title:string,
  subTitle:string,
  haveForm:boolean
}

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [SlickCarouselModule,CommonModule],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.css',
  // host:{ngSkipHydration:'true'}
})


export class SlidersComponent {


  bannersConfigs:banner[] = [
    {
      img:'assets/imgs/slider/slider-1.png',
      title:'Bienvenue sur le Djassa2Baby',
      subTitle:'Abonnez-vous a notre newsletter et recevez nos offres.',
      haveForm:true
    },
    {
      img:'assets/imgs/slider/slider-2.png',
      title:'Mettez en avant votre Boutique',
      subTitle:'Faites connaitre votre marque de tous !',
      haveForm:true
    }
  ]


  slideConfig = {
    "arrows":true,
    "draggable": true,
    "dots": true,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "loop": true,
    "fade": true,
    "autoplay": true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };


  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  ngOnInit(): void {}


  constructor() { }




}
