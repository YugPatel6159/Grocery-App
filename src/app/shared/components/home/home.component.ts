import { Component } from '@angular/core';
import { ExploreCategoriesComponent } from '../explore-categories/explore-categories.component';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';
import { TrendingItemsComponent } from '../trending-items/trending-items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
ngOnInit(){
  window.scrollTo(0,0);
}
}
