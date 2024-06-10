import { Component } from '@angular/core';
import { SingleCategorieComponent } from '../single-categorie/single-categorie.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../interfaces/Icategory';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-list-categorie',
  standalone: true,
  imports: [SingleCategorieComponent,SlickCarouselModule,CommonModule,RouterModule,NgxSkeletonLoaderModule],
  templateUrl: './list-categorie.component.html',
  styleUrl: './list-categorie.component.css',
})
export class ListCategorieComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfLoader = [0,1,2,3,5,6,7,8]

  constructor(private apiService:ApiService) {

  }

  ngOnInit(): void {

    this.getCategory()

  }


  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        console.log(response);  // Affichage de la réponse dans la console
        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments

        setTimeout(()=>{
          this.listOfData.next(response);
        },2000)

        // Affichage de la valeur actuelle de listOfData dans la console
        console.log(this.listOfData.value);
      }
    );
  }




  slides = [
    {img: "http://placehold.it/350x150/000000", val:1},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},
    {img: "http://placehold.it/350x150/111111",val:2},

  ];


  slideConfig = {
    "autoplay": true,
    "autoplaySpeed": 1000,
    "arrows":false,
    "infinite":true ,
    "slidesToShow": 10,
    "slidesToScroll": 1,
    "loop": true,
    "adaptiveHeight": true,
    "responsive": [
          {
              "breakpoint": 1025,
              "settings": {
                  "slidesToShow": 4,
                  "slidesToScroll": 1
              }
          },
          {
              "breakpoint": 768,
              "settings": {
                  "slidesToShow": 3,
                  "slidesToScroll": 1
              }
          },
          {
              "breakpoint": 480,
              "settings": {
                  "slidesToShow": 2,
                  "slidesToScroll": 1
              }
          }
      ],
  };




  trackByFn(index: number, item: any): any {
    return index; //or item.id if you have unique identifiers
  }



  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' ,val:2});
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
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




}
