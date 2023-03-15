import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Grocery } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private route:ActivatedRoute, private proService:ProductService){
  }
  products=this.proService.groceryList;
 urlCategory:string='';
 uniqueItems = this.products.filter((item, index, arr) => {
  return index === arr.findIndex(t => t.store === item.store);
});
selectedItems = {};


  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.urlCategory=params['i'];
    })
    window.scrollTo(0,0);
  }
  filterToggle=false;
  display(){
    this.filterToggle = !this.filterToggle;
  }
  get filteredProducts() {
    if (this.urlCategory == "All") {
      return this.products;
    } else {
      return this.products.filter(product => product.category === this.urlCategory);
    }
  }


}
