import { Component } from '@angular/core';
import { Product } from '../../../interfaces/Iproduct';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import $ from 'jquery'
import { CartService } from '../../../services/others/cart.service';
import { EcommerceService } from '../../../services/others/ecommerce.service';
import { Store } from '../../../interfaces/Ishop';
export interface SliderImgaes{
  img:string,
}

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
  // host:{ngSkipHydration:'true'}
})
export class DetailsProductComponent {

  product!:Product
  slugProduct:string=''
  quantity:number=1
  similarProduct:Product[] = []
  vendorDetails!:Store
  baseUrl:string='http://djassa2baby.pythonanywhere.com/'
  whatsappUrl:string=''


  constructor(private apiService: ApiService, private activatedRoute:ActivatedRoute, private cartService: CartService, private ecommerService:EcommerceService,private router: Router) {
    // Injectez les dépendances via le constructeur
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDetailsProduct()
    this.getSimilarProduct()
    // this.getVendorDetails()
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

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

    this.cartService.addToCart(this.product, this.quantity)
  }

  addToWhishList(){

    this.cartService.addToWhishList(this.product)
  }



  sendWhatsappMessage() {
    const phoneNumber = encodeURIComponent(this.product.shop.phone_number_1);
    const message = encodeURIComponent('Votre message ici');
    window.open(`https://api.whatsapp.com/send?phone=++225${phoneNumber}&text=${message}`)
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
    prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };


  slidethumbnailsConfig = {
    "arrows":false,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "asNavFor": '.product-image-slider',
    "dots": false,
    "focusOnSelect": true,
    // "prevArrow": '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
    // "nextArrow": '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
  };


  bannersConfigs:SliderImgaes[] = [

  ]


  getDetailsProduct() {
    const params = this.activatedRoute.snapshot.paramMap.get('id');
    if (params) {
      this.slugProduct = params;
      this.apiService.getItem('products', this.slugProduct).subscribe(
        (response: Product) => {
          this.product = response;

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
  }


 getSimilarProduct(){
  this.apiService.getItems('similar-products').subscribe(
    (response:Product[])=>{

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

  // Remove active class from all thumbnail slides
  $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
  // Set active class to first thumbnail slides
  $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

  // On before slide change match active thumbnail to current slide
  $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
    $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
  });


  // Qty Up-Down
  $('.detail-qty').each(function () {
    var qtyval = parseInt($(this).find('.qty-val').text(), 10);
    $('.qty-up').on('click', function (event) {
      event.preventDefault();
      qtyval = qtyval + 1;
      $(this).prev().text(qtyval);
    });
    $('.qty-down').on('click', function (event) {
      event.preventDefault();
      qtyval = qtyval - 1;
      if (qtyval > 1) {
        $(this).next().text(qtyval);
      } else {
        qtyval = 1;
        $(this).next().text(qtyval);
      }
    });
  });

  $('.dropdown-menu .cart_list').on('click', function (event) {
    event.stopPropagation();
  });
}

}
