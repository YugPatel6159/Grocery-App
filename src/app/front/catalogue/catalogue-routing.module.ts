import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {
    path:'category',component:CategoryComponent
  },
  {
    path:'search-categories/:category/product-details/:id/:grocery_name', component:ProductDetailsComponent
  },
  {
    path:'categories/:category/product-details/:id/:grocery_name', component:ProductDetailsComponent
  },
  {
    path:'cart/checkout', component:CheckoutComponent
  },
  {
    path:'cart/checkout/success', component:SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
