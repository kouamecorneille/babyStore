import { NgModule } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, RouterModule, Routes, withDebugTracing, withInMemoryScrolling } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { VendorComponent } from './vendor/vendor.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HotdealsComponent } from './hotdeals/hotdeals.component';
import { ProductRecommandationsComponent } from './product-recommandations/product-recommandations.component';
import { DetailsVendorComponent } from './details-vendor/details-vendor.component';
import { VendorGuideComponent } from './vendor-guide/vendor-guide.component';
import { CartComponent } from './cart/cart.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AuthGuard } from '../../helpers/guards/auth.guard';
import { MainContentComponent } from './main-content/main-content.component';
import { ShopCheckoutComponent } from './shop-checkout/shop-checkout.component';
import { ShopCompareComponent } from './shop-compare/shop-compare.component';
import { ShopWishlistComponent } from './shop-wishlist/shop-wishlist.component';
import { ProductPerCategoryComponent } from './product-per-category/product-per-category.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { networkStatusGuard } from '../../helpers/guards/network-status.guard';
import { ProductPerCategoryVendorComponent } from './product-per-category-vendor/product-per-category-vendor.component';
import { DetailsProductVendorComponent } from './details-product-vendor/details-product-vendor.component';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { SuccessOrdersComponent } from './success-orders/success-orders.component';
import { PrincingComponent } from './princing/princing.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'hot-deals',
        pathMatch: 'full',
        data: { animation: 'HotDealsPage' }
      },
      {
        path: 'hot-deals',
        component: HotdealsComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'HotDealsPage' }
      },
      {
        path: 'register-store',
        component: RegisterStoreComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'RegisterStorePage' }
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ShopPage' }
      },
      {
        path: 'details-product/:id',
        component: DetailsProductComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'DetailsProductPage' }
      },
      {
        path: 'store/:slug/details-product/:id',
        component: DetailsProductVendorComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'DetailsProductVendorPage' }
      },
      {
        path: 'about',
        component: AboutUsComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'AboutUsPage' }
      },
      {
        path: 'recommandations',
        component: ProductRecommandationsComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ProductRecommandationsPage' }
      },
      {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'VendorPage' }
      },
      {
        path: 'pricing',
        component: PrincingComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'pricing' }
      },
      {
        path: 'vendors/guide',
        component: VendorGuideComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'VendorGuidePage' }
      },
      {
        path: 'vendors/details/:name',
        component: DetailsVendorComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'DetailsVendorPage' }
      },
      {
        path: 'categorie/:name/product',
        component: ProductPerCategoryComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ProductPerCategoryPage' }
      },
      {
        path: 'store/:slug/categorie/:name',
        component: ProductPerCategoryVendorComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ProductPerCategoryVendorPage' }
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'CartPage' }
      },
      {
        path: 'contact-us',
        component: ContactComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ContactPage' }
      },
      {
        path: 'shop-checkout',
        component: ShopCheckoutComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ShopCheckoutPage' }
      },
      {
        path: 'shop-compare',
        component: ShopCompareComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ShopComparePage' }
      },
      {
        path: 'shop-wishlist',
        component: ShopWishlistComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'ShopWishlistPage' }
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'PrivacyPolicyPage' }
      },
      {
        path: 'success-orders',
        component: SuccessOrdersComponent,
        canActivate: [networkStatusGuard],
        data: { animation: 'successOrders' }
      }
    ]
  }
];



const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers:[
  //   provideRouter(
  //     routes,
  //     inMemoryScrollingFeature
  //   ),
  // ]
})
export class ContentRoutingModule { }
