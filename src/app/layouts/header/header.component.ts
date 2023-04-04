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
customerDetails: any;
tokenValue:boolean=false;
constructor(private service:ProductService,private cartService:CartService, private router:Router, private Route:ActivatedRoute, private apiService:ApiService, private http:HttpClient){
  this.apiService.getCartData().subscribe(res=>{this.cartLength = res.length});
  this.token = localStorage.getItem('token');
  if(this.token){
    this.tokenValue = true
  }
  else{
    this.tokenValue = false
  }

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
this.cartService.header$.subscribe(res=>this.tokenValue = res)
this.token = localStorage.getItem('token');
if(this.token){
  this.tokenValue = true
}
else{
  this.tokenValue = false
}

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
name!:string
getCustomerDetails(){
 this.apiService.getUserDetails().subscribe(
  {
    next:(data:any)=>
    {
      this.customerDetails = data.data; 
      console.log("user Data",this.customerDetails);
      this.name = data.data.username
    },

      error:(err:any)=>{
      console.log(err);
    }
  });
}
onLogout(){
  localStorage.removeItem('token');
  this.router.navigate(['']);
  this.token = localStorage.getItem('token');
if(this.token){
  this.tokenValue = true
}
else{
  this.tokenValue = false
}

}



}
