import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './front/catalogue/category/category.component';
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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
