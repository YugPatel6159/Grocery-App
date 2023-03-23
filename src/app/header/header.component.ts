import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComponent } from '../front/catalogue/category/category.component';
import { CartService } from '../shared/cart.service';
import { Grocery } from '../shared/interface';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
constructor(private service:ProductService,private cartService:CartService, private router:Router, private Route:ActivatedRoute){
}
// groceryList:Grocery[] = this.service.groceryList
optionCategory:Grocery[]=this.service.groceryList;
uniqueCategories:Grocery[]= this.service.uniqueCategory;
category:string='';
searchTerm: string = '';
cartLength:number=0;
grandTotal =0; 

ngOnInit(){
this.service.selectedCategory = this.category;
this.cartService.cartItem.subscribe((res)=>{
  this.cartLength = res.length;
})
this.cartService.subTotal.subscribe(res=>{
  this.grandTotal = res
})
}

onSubmit() {
  this.service.filterProducts(this.searchTerm)
  this.service.searchTerm=this.searchTerm;
  const route = `/search-categories/${this.category === 'All categories' ? 'All' : this.category}`;
  this.router.navigate([route]);
  this.searchTerm='';
}

}
