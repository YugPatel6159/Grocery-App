import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:'category',component:CategoryComponent
  },
  {
    path:'search-categories/:category/product-details/:id/:grocery_name', component:ProductDetailsComponent
  },{
    path:'categories/:category/product-details/:id/:grocery_name', component:ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
