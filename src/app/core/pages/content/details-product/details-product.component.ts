import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Product } from '../../../interfaces/Iproduct';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import $ from 'jquery'
import { CartService } from '../../../services/others/cart.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Store } from '../../../interfaces/Ishop';
import { Subscription } from 'rxjs';

export interface SliderImgaes{
  img:string,
}

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  // host:{ngSkipHydration:'true'}
})
export class DetailsProductComponent implements  OnInit, OnDestroy {

  product!:Product
  productDetails = signal<Product>({
    id: '',
    category: {
      id: '',
      name: '',
      slug: '',
      description: '',
      image: '',
      is_active: false
    },
    shop: {
      id: '',
      name: '',
      phone_number_1: '',
      phone_number_2: '',
      description: '',
      logo: '',
      slug: '',
      email: '',
      location: '',
      facebook_link: '',
      whatsapp_link: '',
      instagram_link: '',
      twitter_link: '',
      is_active: false,
      can_evaluate: false,
      date_added: '',
      subscription: ''
    },
    name: '',
    description: '',
    price: '',
    reduced_price: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    quantity_in_stock: 0,
    instock: false,
    added_at: '',
    average_rating: '',
    total_ratings: 0,
    slug: ''
  });

  slugProduct= signal<string | undefined>(undefined);
  quantity:number=1
  similarProduct:Product[] = []
  routeSubscription: Subscription | null = null;
  vendorDetails!:Store
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'
  whatsappUrl:string=''


  constructor(private apiService: ApiService, private activatedRoute:ActivatedRoute, private cartService: CartService, private ecommerService:EcommerceService,private router: Router) {
    // Injectez les dépendances via le constructeur
  }


  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.slugProduct.set(params['id'] ? params['id'] : undefined);
      this.getDetailsProduct();
      this.getSimilarProduct();
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }



  ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
	}


  next(slug:string) {

    this.bannersConfigs = [];
    this.slugProduct.set(slug);
    this.getDetailsProduct();
    this.getSimilarProduct();

		this.router.navigate(['/details-product/' + this.slugProduct()])
	}




  ngAfterViewInit(): void {
    this.initProductDetails();
  }


  addQuantity(): void {

    this.quantity +=1

  }

  reduceQuantity(): void {
    if (this.quantity > 1) { // Vérifiez si la quantité est supérieure à 1
      this.quantity -= 1; // Réduisez la quantité seulement si elle est supérieure à 1
    }
}

  addTocart(){

    this.cartService.addToCart(this.productDetails(), this.quantity)
  }

  addToWhishList(){

    this.cartService.addToWhishList(this.productDetails())
  }



  sendWhatsappMessage() {
    const phoneNumber = encodeURIComponent(this.productDetails().shop.phone_number_1);
    
    // Personnalisation du message avec des retours à la ligne et des emojis
    const productName = encodeURIComponent(`*${this.productDetails().name}*`); // Met le nom du produit en gras
    const quantity = encodeURIComponent(`${this.quantity}`); // Convertit la quantité en texte
    
    const text = `Bonjour 👋,%0A%0AJ'aimerais commander l'article :%0A🛒 ${productName}%0A pour une quantité de : %0A🔢 ${quantity}%0A%0AMerci beaucoup ! 😊`;
  
    const message = encodeURIComponent(text);
  
    window.open(`https://api.whatsapp.com/send?phone=+225${phoneNumber}&text=${message}`);
  }
  
  


  slideConfig = {
    "arrows":false,
    "draggable": true,
    "dots": false,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "loop": true,
    "fade": true,
    "autoplay": true,
    // prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    // nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };


  slidethumbnailsConfig = {
    "arrows":false,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "asNavFor": '.product-image-slider',
    "dots": false,
    "focusOnSelect": true,
    "prevArrow": '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    "nextArrow": '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };


  bannersConfigs:SliderImgaes[] = [

  ]


  getDetailsProduct() {
      this.apiService.getItem('products', this.slugProduct()).subscribe(
        (response: Product) => {

          this.bannersConfigs = [];
          this.product = response;
          this.productDetails.set(response)

          if (response.image1 && response.image1.trim() !== "") {
            this.bannersConfigs.push({ img: response.image1 });
          }
          if (response.image2 && response.image2.trim() !== "") {
            this.bannersConfigs.push({ img: response.image2 });
          }
          if (response.image3 && response.image3.trim() !== "") {
            this.bannersConfigs.push({ img: response.image3 });
          }
          if (response.image4 && response.image4.trim() !== "") {
            this.bannersConfigs.push({ img: response.image4 });
          }
          if (response.image5 && response.image5.trim() !== "") {
            this.bannersConfigs.push({ img: response.image5 });
          }

          this.vendorDetails = response.shop;

          // this.ecommerService.getShopDetails(response.shop)
        }
      );

  }


 getSimilarProduct(){
  this.apiService.getItems(`similar-products?product_id=${this.productDetails().id}&&category_id=${this.productDetails().category.id}`).subscribe(
    (response:Product[])=>{
      console.log("PRODUCT :",response);
 
      this.similarProduct = response.slice(0,4);
    }
  )
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



formatProductDescription(description: string) {
  // Remplacer les points ou les tirets de six par un retour à la ligne
  const formattedDescription = description.replace(/(\.{1}|-{1})/g, '<br>');

 return formattedDescription;
}



getVendorDetails(){

  this.ecommerService.getShopDetails(this.product.shop.slug);
  this.ecommerService.storeDetails.subscribe((data) => {
    console.log("VENDOR: ",data)
    this.vendorDetails = data
  })
}



initProductDetails(): void {
  // Ensure Slick is initialized before performing operations
  if ($('.product-image-slider').hasClass('slick-initialized')) {
    // Remove active class from all thumbnail slides
    $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
    // Set active class to first thumbnail slide
    $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

    // On before slide change match active thumbnail to current slide
    $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      if (slick) {
        var mySlideNumber = nextSlide;
        $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
        $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
      } else {
        console.warn('Slick carousel not initialized yet. Thumbnail synchronization might not work.');
      }
    });

    $('.dropdown-menu .cart_list').on('click', function (event) {
      event.stopPropagation();
    });
  } else {
    console.warn('Slick carousel not initialized yet.');
  }
}

}
