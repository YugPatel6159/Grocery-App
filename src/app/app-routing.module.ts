import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './front/catalogue/cart/cart.component';
import { CategoryComponent } from './front/catalogue/category/category.component';
import { ProductDetailsComponent } from './front/catalogue/product-details/product-details.component';
import { LoginComponent } from './front/user/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {path:'login', component:LoginComponent},
  {
    path:'categories/:i', component:CategoryComponent
  },
  {
    path:'search-categories/:i', component:CategoryComponent
  },
  {
    path:'featured-products/:i.grocery_name', component:ProductDetailsComponent
  },
  {
    path:'top-sells/:category.category', component:ProductDetailsComponent
  },
  {
    path:'top-rated/:product.grocery_name', component:ProductDetailsComponent
  },
  {
    path:'trending-items/:category.category', component:ProductDetailsComponent
  },
  {
    path:'recently-added/:category.category', component:ProductDetailsComponent
  },
  {
    path:'cart', component:CartComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
