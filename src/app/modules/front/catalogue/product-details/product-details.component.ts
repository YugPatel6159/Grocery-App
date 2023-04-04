import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grocery } from 'src/app/shared/models/interface';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { ProductService } from 'src/app/shared/services/productservice/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute, private service:ProductService, private cartService:CartService,private toastr: ToastrService){
  }
  urlGroceryName:any;
  urlCategory:any;
  productId:number=0;
  productImg:any;
  matchedProduct:any;
  price: any;
  discPrice:any;
  quantityCount:number=1;
  
  ngOnInit(){
    this.route.params.subscribe((res)=>{
      this.urlGroceryName = res['grocery_name'];
      this.urlCategory = res['category'];
      this.productId = Number(res['id']);  
      console.log(this.urlGroceryName,this.urlCategory, this.productId);
      
    })
    this.matchedProduct = this.service.matchProduct(this.productId);   
    this.price =this.matchedProduct.price;
    this.discPrice = this.matchedProduct.discountedPrice;
  }
  minus(){
    if(this.quantityCount>=1){

      this.quantityCount-=1;
      this.price = this.price - this.matchedProduct.price;
      this.discPrice = this.discPrice - this.matchedProduct.discountedPrice;
    }
}
  plus(){
    if(this.quantityCount>=0){
      this.quantityCount+=1;
      this.price = this.price + this.matchedProduct.price;
      this.discPrice = this.discPrice + this.matchedProduct.discountedPrice;
    }
  }
  
  onAdd(product:any){
    this.cartService.addProductToCart(product);
    this.toastr.success('product added to cart','Success')
    }
}
