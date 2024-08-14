import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/Iproduct';
import { ApiService } from '../api.service';
import { Store } from '../../interfaces/Ishop';
import { ICategory } from '../../interfaces/Icategory';

@Injectable({
  providedIn: 'root'
})

export class EcommerceService {

  listOfProduct = new BehaviorSubject<Product[]>([]);
  listOfProducts = new BehaviorSubject<Product[]>([]);
  listOfVendorProducts = new BehaviorSubject<Product[]>([]);
  listOfVendorProductsCategory = new BehaviorSubject<Product[]>([]);
  listOfRecommendations = new BehaviorSubject<Product[]>([]);
  listOfStores = new BehaviorSubject<Store[]>([]);
  searchVisible = signal<boolean>(false)
  isRefreshing = signal<boolean>(false)

  newProducts = new BehaviorSubject<Product[]>([]);
  // Créez un objet conforme à l'interface Store avec des valeurs initiales
  initialStore: Store = {
    id: '',
    name: '',
    logo: '',
    email: '',
    phone_number_1: '',
    phone_number_2: '',
    description: '',
    location: '',
    facebook_link: '',
    whatsapp_link: '',
    instagram_link: '',
    twitter_link: '',
    is_active: false,
    can_evaluate: false,
    date_added: '',
    slug: '',
    subscription: ''
  };

// Créez un BehaviorSubject avec l'objet initial
  storeDetails = new BehaviorSubject<Store>(this.initialStore);
  listOfProductByCategory = new BehaviorSubject<Product[]>([]);
  listOfCategory = new BehaviorSubject<ICategory[]>([]);
  constructor(private apiService:ApiService) { }

  getAllProducts() {

    this.apiService.getItems("products").subscribe(
      (response:Product[]) => {
        this.listOfProduct.next(response.reverse());
        this.listOfRecommendations.next(response.slice(5, 15));
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }

  getListOfVendors(){


    this.apiService.getItems(`shops`).subscribe(
      (response:Store[]) => {

        if(response){
         setTimeout(()=>{
          this.listOfStores.next(response);
         }, 1000)

        }
      },
      (err:any)=>{

        console.log(err)
      }
    )

  }



  getVendorProducts(slug:string) {

    this.apiService.getItems(`/shops/${slug}/products`).subscribe(
      (response:Product[]) => {

        this.listOfVendorProducts.next(response.reverse());

      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }

  getVendorProductsCategory(category_id:string,shop_id:string) {

    this.apiService.getItems(`/products/shop/${shop_id}/category/${category_id}/`).subscribe(
      (response:Product[]) => {
        console.log("getVendorProductsCategory :", response)
        this.listOfVendorProducts.next(response.reverse());
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }




  getProductBouqtiqueOfficielle() {

    this.apiService.getItems("products").subscribe(
      (response:Product[]) => {

        this.listOfProducts.next(response.reverse());
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getProductsBySlug(category_slug:string) {

    this.apiService.getItems(`products/category/${category_slug}`).subscribe(
      (response:Product[]) => {

        this.listOfProductByCategory.next(response.reverse());
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getProductsVendorBySlug(category_slug:string) {

    this.apiService.getItems(`shops/products/category/${category_slug}`).subscribe(
      (response:Product[]) => {

        this.listOfProductByCategory.next(response.reverse());
      },
      (error:any) => {
        console.log(error.message)
      }
    )

  }


  getCategory() {
    // Appel de l'API pour récupérer les catégories d'éléments
    this.apiService.getItems('categories').subscribe(
      (response: ICategory[]) => {  // Utilisation de subscribe pour s'abonner à la réponse
        // Mettre à jour la première partie de la liste de données avec les 7 premiers éléments
        this.listOfCategory.next(response);
        // Affichage de la valeur actuelle de listOfData dans la console
      }
    );
  }



  filterProductsByDate(products: Product[]): void {
    // Obtenez la date actuelle en millisecondes depuis l'époque (01 janvier 1970 00:00:00 UTC)
    const currentDate = Date.now();
    // Calculez le timestamp correspondant à 2 jours avant la date actuelle
    const twoDaysAgo = currentDate - (2 * 24 * 60 * 60 * 1000); // 2 jours * 24 heures * 60 minutes * 60 secondes * 1000 millisecondes
    // Filtrer les produits enregistrés il y a moins de 2 jours
    const filteredProducts = products.filter(product => {
        // Obtenez le timestamp de la date d'ajout du produit
        const productAddedAt = new Date(product.added_at).getTime();
        // Vérifiez si la date d'ajout est supérieure à deux jours avant la date actuelle
        return productAddedAt > twoDaysAgo;
    });

    // console.log("Products :", filteredProducts);
    // Assurez-vous que `this.newProducts` est initialisé comme un BehaviorSubject
    // Retournez la liste des produits filtrés
    this.newProducts.next(filteredProducts.slice(0,3));
}



  getShopDetails(slug:string) {

    this.apiService.getItem("shops", slug).subscribe(
      (response:Store) => {

        this.storeDetails.next(response);
      }
    )

  }

  searchProduct(term:string){

    return this.apiService.getItems(`products/search/?q=${term}`);
  }



}
