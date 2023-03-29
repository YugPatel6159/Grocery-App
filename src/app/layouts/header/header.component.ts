import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComponent } from '../../modules/front/catalogue/category/category.component';
import { CartService } from '../../shared/services/cartservice/cart.service';
import { Grocery } from '../../shared/models/interface';
import { ProductService } from '../../shared/services/productservice/product.service';
import { CatalogueModule } from 'src/app/modules/front/catalogue/catalogue.module';

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
this.cartService.subTotal$.subscribe(res=>{
  this.grandTotal = res
})
}
categoryChange(event:any){
  this.category=event.target.value
}
allCategories(){
  this.service.searchTerm=''
  this.router.navigate(['/catalogue/categories/All']);
  // this.service.allProducts.next(this.service.groceryList);
}

onSubmit() {
  this.service.filterProducts(this.searchTerm)
  this.service.searchTerm=this.searchTerm;
  const route = `/catalogue/search-categories/${this.category === 'All categories' ? 'All' : this.category}`;
  this.router.navigate([route]);
  this.searchTerm='';
}



}
