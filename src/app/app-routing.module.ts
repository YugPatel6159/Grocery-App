import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart/cart.component';
import { CategoryComponent } from './modules/front/catalogue/category/category.component';
import { ProductDetailsComponent } from './modules/front/catalogue/product-details/product-details.component';
import { LoginComponent } from './modules/front/user/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'catalogue',
    loadChildren:()=>import('./modules/front/catalogue/catalogue.module').then(m=>m.CatalogueModule)
  },
  {
    path:'cart',
    loadChildren:()=>import('./modules/cart/cart.module').then(m=>m.CartModule)
  },
  {
    path:'user',
    loadChildren:()=>import('./modules/front/user/user.module').then(m=>m.UserModule)
  },
  {
    path:'user-profile',
    loadChildren:()=>import('./modules/user-profile/user-profile.module').then(m=>m.UserProfileModule)
   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// {path:'login', component:LoginComponent},
//   {
//     path:'categories/:i', component:CategoryComponent
//   },
//   {
//     path:'search-categories/:i', component:CategoryComponent
//   },
//   {
//     path:'featured-products/:i.grocery_name', component:ProductDetailsComponent
//   },
//   {
//     path:'top-sells/:category.category', component:ProductDetailsComponent
//   },
//   {
//     path:'top-rated/:product.grocery_name', component:ProductDetailsComponent
//   },
//   {
//     path:'trending-items/:category.category', component:ProductDetailsComponent
//   },
//   {
//     path:'recently-added/:category.category', component:ProductDetailsComponent
//   },
//   {
//     path:'cart', component:CartComponent
//   }
  