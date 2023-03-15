import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { FrontModule } from './front/front.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './front/user/user.module';
import { CatalogueModule } from './front/catalogue/catalogue.module';
import { ExploreCategoriesComponent } from './explore-categories/explore-categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { TrendingItemsComponent } from './trending-items/trending-items.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    ExploreCategoriesComponent,
    FeaturedProductsComponent,
    TrendingItemsComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FrontModule,AdminModule,UserModule,CatalogueModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
