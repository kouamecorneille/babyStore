import { Component } from '@angular/core';
import { ListCategorieComponent } from '../list-categorie/list-categorie.component';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../interfaces/Icategory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [ListCategorieComponent,CommonModule, RouterModule,NgxSkeletonLoaderModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})

export class PopularCategoriesComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])

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
        setTimeout(() => {
          this.listOfData.next(response.slice(0, 4));
        },2000)

        // Affichage de la valeur actuelle de listOfData dans la console
        console.log(this.listOfData.value);
      }
    );
  }



}
