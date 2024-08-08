import { Component, Input, WritableSignal, signal } from '@angular/core';
import { Store } from '../../interfaces/Ishop';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from '../../services/auth/authenticate.service';
import { User } from '../../interfaces/Iuser';
import { Product } from '../../interfaces/Iproduct';
import { BehaviorSubject } from 'rxjs';
import { ProductReview } from '../../interfaces/IReviews';

type Rating = 1 | 2 | 3 | 4 | 5;

interface RatingCount {
  [key: number]: number;
}

interface RatingPercentages {
  [key: number]: number;
}



@Component({
  selector: 'app-product-info',
  // imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css' // Notez le 's' après styleUrl
})
export class ProductInfoComponent {

  @Input() product!:Product;
  @Input() vendor!: Store;
  @Input() description!:string;

  reviewForm: FormGroup;
  loader: boolean = false;
  rating=0
  userSession: User | null;
  listOfReviews = new BehaviorSubject<ProductReview[]>([])
  reviews: ProductReview[] = [];
  ratingPercentages: RatingPercentages = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  averageRating: number = 0;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private authService: AuthenticateService,
    private router: Router
  ) {

    this.userSession = this.authService.getUser();
    this.reviewForm = this.fb.group({
      comment: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getProductReviews()
  }

  sendComment() {
    if (this.reviewForm.valid) {
      if (this.userSession) {
        this.loader = true;

        const data = {
          comment: this.reviewForm.value.comment,
          product: this.product.id,
          user : this.userSession.id,
          rating:this.rating
        };

        console.log(data);
        this.apiService.postItem(data, "product-reviews/").subscribe(
          (response: ProductReview) => {
            this.loader = false;
            if (response) {
              this.reviewForm.reset()
              this.getProductReviews()
              this.toastr.success('Votre commentaire a bien été envoyé au vendeur !', 'Commentaire');
            }
          },
          (error: any) => {
            this.loader = false;
            this.toastr.error('Oops, nous avons rencontré une erreur interne !', 'Erreur du serveur');
          }
        );
      } else {
        this.toastr.error('Vous devez être connecté pour commenter !', 'Connexion requise');
        this.router.navigate(["/auth/login"]);
      }
    } else {
      this.toastr.error("Le formulaire n'est pas valide !", 'Commentaire');
    }
  }

  getProductReviews(){

    this.apiService.getItems(`products/${this.product.slug}/reviews/`).subscribe(
      (response:ProductReview[])=>{
        this.listOfReviews.next(response)
        this.reviews = response.reverse();
        this.calculateRatings();
      }
    )

  }

  calculateRatingPercentage(rating: number): number {
    const clampedRating = Math.max(0, Math.min(5, rating)); // Assurez-vous que la note est entre 0 et 5
    return (clampedRating / 5) * 100; // Calculez la largeur en pourcentage
}



    calculateRatings(): void {
      const totalReviews = this.reviews.length;
      if (totalReviews === 0) return;

      let sumRatings = 0;
      const ratingsCount: RatingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

      this.reviews.forEach(review => {
        sumRatings += review.rating;
        ratingsCount[review.rating]++;
      });

      this.averageRating = sumRatings / totalReviews;
      this.ratingPercentages = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }; // Reset percentages

      for (const key in ratingsCount) {
        if (Object.prototype.hasOwnProperty.call(ratingsCount, key)) {
          const rating = Number(key) as Rating;
          this.ratingPercentages[rating] = (ratingsCount[key] / totalReviews) * 100;
        }
      }
    }




}
