import { Component } from '@angular/core';
import { ICategory } from '../../../interfaces/Icategory';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Product } from '../../../interfaces/Iproduct';

@Component({
  selector: 'app-hotdeals',
  templateUrl: './hotdeals.component.html',
  styleUrl: './hotdeals.component.css',
  host:{ngSkipHydration:'true'}
})
export class HotdealsComponent {

  listOfData = new BehaviorSubject<ICategory[]>([])
  listOfData2 = new BehaviorSubject<ICategory[]>([])
  products!: Product[]

  constructor(private apiService:ApiService, private ecommerceService:EcommerceService) {

  }

  ngOnInit(): void {

    this.getCategory()
    this.iniData()
  }


  iniData(){
    this.ecommerceService.getAllProducts()
    this.ecommerceService.listOfProduct.subscribe((data) => {

      setTimeout(() => {
        this.products = data;
      }, 3000);
    })
  }


  // Fonction pour mélanger un tableau
  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // Fonction pour obtenir 3 catégories aléatoires une fois par jour
  getCategory() {
    const today = new Date().toDateString(); // Obtenir la date d'aujourd'hui au format string
    const savedCategories = JSON.parse(localStorage.getItem('randomCategories') || 'null'); // Charger les catégories depuis le localStorage
    const savedDate = localStorage.getItem('randomCategoriesDate'); // Charger la date enregistrée

    // Si les catégories ont déjà été sélectionnées aujourd'hui, on les utilise
    if (savedCategories && savedDate === today) {

      this.listOfData.next(savedCategories);

    } else {
      // Sinon, on appelle l'API et on sélectionne de nouvelles catégories pour la journée
      this.apiService.getItems('/categories').subscribe(
        (response: ICategory[]) => {
          const shuffledCategories = this.shuffleArray(response); // Mélanger les catégories
          const randomCategories = shuffledCategories.slice(0, 3); // Sélectionner les 3 premières

          // Enregistrer les catégories sélectionnées et la date dans le localStorage
          localStorage.setItem('randomCategories', JSON.stringify(randomCategories));
          localStorage.setItem('randomCategoriesDate', today);

          // Mettre à jour la liste des données dans le BehaviorSubject
          this.listOfData.next(randomCategories);
        },
        (error) => {
          console.error('Erreur lors de la récupération des catégories:', error);
        }
      );
    }
  }







}
