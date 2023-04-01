import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComponent } from '../../modules/front/catalogue/category/category.component';
import { CartService } from '../../shared/services/cartservice/cart.service';
import { Grocery } from '../../shared/models/interface';
import { ProductService } from '../../shared/services/productservice/product.service';
import { CatalogueModule } from 'src/app/modules/front/catalogue/catalogue.module';
import { createPopper } from '@popperjs/core';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
constructor(private service:ProductService,private cartService:CartService, private router:Router, private Route:ActivatedRoute, private apiService:ApiService, private http:HttpClient){
  // this.cartService.totalPrice$.subscribe(res=>{
  //   this.grandTotal = res
  // })
  this.apiService.getCartData().subscribe(res=>{this.cartLength = res.length});
  // this.apiService.getCartTotal().subscribe((res:any)=>{this.grandTotal = res['subTotal']['subtotal'];})
  this.token = localStorage.getItem('token');
  this.cartService.cartItem$.subscribe((res)=>{this.cartLength = res})
  this.cartService.subTotal$.subscribe((res)=>{this.grandTotal=res});
}

// groceryList:Grocery[] = this.service.groceryList
optionCategory:Grocery[]=this.service.groceryList;
uniqueCategories:Grocery[]= this.service.uniqueCategory;
category:string='';
searchTerm: string = '';
cartLength:number=0;
grandTotal =0; 
token:any;
userDetails:any;
ngOnInit(){
this.service.selectedCategory = this.category;
this.apiService.getCartTotal().subscribe((res:any)=>{this.grandTotal = res['subTotal']['subtotal'];})

// this.cartService.cartItem.subscribe((res)=>{
//   this.cartLength = res.length;
// })

// this.apiService.getCartData().subscribe(res=>{this.cartLength = res.length});

// this.cartService.cartItem$.subscribe(res=>this.cartLength=res.length)
this.getCustomerDetails();
 
}
categoryChange(event:any){
  this.category=event.target.value
}
allCategories(){
  this.service.searchTerm=''
  this.router.navigate(['/catalogue/categories/All']);
}

onSubmit() {
  this.service.filterProducts(this.searchTerm)
  this.service.searchTerm=this.searchTerm;
  const route = `/catalogue/search-categories/${this.category === 'All categories' ? 'All' : this.category}`;
  this.router.navigate([route]);
  this.searchTerm='';
}

getCustomerDetails(){
  this.userDetails = this.apiService.getUserDetails();
  console.log("user Data",this.userDetails);
}


}
