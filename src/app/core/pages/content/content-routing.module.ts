import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withDebugTracing, withInMemoryScrolling } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'hot-deals',
        pathMatch: 'full'
      },
      {
        path: 'hot-deals',
        component: HotdealsComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'details-product/:id',
        component: DetailsProductComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'store/:slug/details-product/:id',
        component: DetailsProductVendorComponent,
        canActivate: [networkStatusGuard]
      },

      {
        path: 'about',
        component: AboutUsComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'recommandations',
        component: ProductRecommandationsComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'vendors',
        component: VendorComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'vendors/guide',
        component: VendorGuideComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'vendors/details/:name',
        component: DetailsVendorComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'categorie/:name/product',
        component: ProductPerCategoryComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'store/:slug/categorie/:name',
        component: ProductPerCategoryVendorComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'cart',
        component: CartComponent,
        // canActivate: [AuthGuard],
        canActivate: [networkStatusGuard]
      },
      {
        path: 'contact-us',
        component: ContactComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'shop-checkout',
        component: ShopCheckoutComponent,
        // canActivate: [AuthGuard],
        canActivate: [networkStatusGuard]

      },
      {
        path: 'shop-compare',
        component: ShopCompareComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'shop-wishlist',
        component: ShopWishlistComponent,
        canActivate: [networkStatusGuard]
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [networkStatusGuard]
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    provideRouter(
      routes,
      // withDebugTracing(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
  ]
})
export class ContentRoutingModule { }
