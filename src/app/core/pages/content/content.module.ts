import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { HotdealsComponent } from './hotdeals/hotdeals.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PopularCategoriesComponent } from '../../components/popular-categories/popular-categories.component';
import { BannersComponent } from '../../components/banners/banners.component';
import { SingleVendorComponent } from '../../components/single-vendor/single-vendor.component';
import { SlidersComponent } from '../../components/sliders/sliders.component';
import { ProductRecommandationsComponent } from './product-recommandations/product-recommandations.component';
import { DetailsVendorComponent } from './details-vendor/details-vendor.component';
import { DealsBreadcrumbComponent } from '../../components/deals-breadcrumb/deals-breadcrumb.component';
import { SingleProductComponent } from '../../components/single-product/single-product.component';
import { BestDealsComponent } from './best-deals/best-deals.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { VendorGuideComponent } from './vendor-guide/vendor-guide.component';
import { ArticlesPropulairesComponent } from '../../components/articles-propulaires/articles-propulaires.component';
import { CartComponent } from './cart/cart.component';
import { CartProductComponent } from "../../components/cart-product/cart-product.component";
import { DetailsProductComponent } from './details-product/details-product.component';
import { DetailGalleryComponent } from '../../components/detail-gallery/detail-gallery.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HeadComponent } from "../../shared/header/head/head.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { BannerVendorsComponent } from '../../components/banner-vendors/banner-vendors.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategorieWithFilterComponent } from '../../components/categorie-with-filter/categorie-with-filter.component';
import { ShopCheckoutComponent } from './shop-checkout/shop-checkout.component';
import { ShopCompareComponent } from './shop-compare/shop-compare.component';
import { ShopWishlistComponent } from './shop-wishlist/shop-wishlist.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductPerCategoryComponent } from './product-per-category/product-per-category.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RestoreScrollPositionDirective } from '../../helpers/directives/restore-scroll-position.directive';
import { ProductPerCategoryVendorComponent } from './product-per-category-vendor/product-per-category-vendor.component';
import { DetailsProductVendorComponent } from './details-product-vendor/details-product-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimestampFormatPipe } from '../../helpers/pipes/timestamp-format.pipe';
import { CorePipesModule } from '../../helpers/pipes/pipes.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { SuccessOrdersComponent } from './success-orders/success-orders.component';
import {NgxPrintModule} from 'ngx-print';
import { DetailsVendorTowComponent } from './details-vendor-tow/details-vendor-tow.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { provideFirebaseApp } from '@angular/fire/app';
import { NotifcationsService } from '../../services/others/notifcations.service';
import { VendorsCategoriesComponent } from '../../components/vendors-categories/vendors-categories.component';
import { PrincingComponent } from './princing/princing.component';
@NgModule({
    declarations: [
        ErrorComponent,
        ContactComponent,
        AboutUsComponent,
        HomeComponent,
        ShopComponent,
        VendorComponent,
        HotdealsComponent,
        PrivacyComponent,
        ProductRecommandationsComponent,
        DetailsVendorComponent,
        BestDealsComponent,
        TopSellingComponent,
        VendorGuideComponent,
        CartComponent,
        DetailsProductComponent,
        MainContentComponent,
        ShopCheckoutComponent,
        ShopCompareComponent,
        ShopWishlistComponent,
        PrivacyPolicyComponent,
        ProductPerCategoryComponent,
        ProductPerCategoryVendorComponent,
        DetailsProductVendorComponent,
        ProductInfoComponent,
        TimestampFormatPipe, // Ajoutez le pipe aux déclarations
        RegisterStoreComponent,
        SuccessOrdersComponent,
        DetailsVendorTowComponent,
        PrincingComponent
    ],
    imports: [
        CommonModule,
        NgbRatingModule,
        ContentRoutingModule,
        BreadcrumbComponent,
        RouterModule,
        ReactiveFormsModule,
        FormsModule, // Add FormsModule here
        PopularCategoriesComponent,
        BannersComponent,
        SingleVendorComponent,
        SlidersComponent,
        NgxPrintModule,
        DealsBreadcrumbComponent,
        SingleProductComponent,
        ArticlesPropulairesComponent,
        CartProductComponent,
        DetailGalleryComponent,
        RelatedProductsComponent,
        HeadComponent,
        FooterComponent,
        BannerVendorsComponent,
        SlickCarouselModule,
        CategorieWithFilterComponent,
        NgxSkeletonLoaderModule,
        NgxSliderModule,
        CorePipesModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule,
        VendorsCategoriesComponent

    ],
    providers: [
      { provide: LOCALE_ID, useValue: 'fr' },
      { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      NotifcationsService
    ],
})
export class ContentModule { }


