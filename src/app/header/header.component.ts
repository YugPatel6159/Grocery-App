import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private service:ProductService){
}
optionCategory=this.service.groceryList;

uniqueCategories = this.service.uniqueItems;
}
