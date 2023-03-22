import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Grocery } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute, private service:ProductService){
  }
  urlGroceryName:any;
  urlCategory:any;
  productId:number=0;
  productImg:any;
  matchedProduct:any;
  price: any;
  discPrice:any;
  count=1;
  
  ngOnInit(){
    this.route.params.subscribe((res)=>{
      this.urlGroceryName = res['grocery_name'];
      this.urlCategory = res['category'];
      this.productId = Number(res['id']);  
    })
    this.matchedProduct = this.service.matchProduct(this.productId);   
    this.price =this.matchedProduct.price;
    this.discPrice = this.matchedProduct.discountedPrice;
  }
  minus(){
    if(this.count>=1){
      this.count = this.count-1;
    
    if(this.matchedProduct.discountedPrice==null){
      this.matchedProduct.price -= this.price; 
    }
    else{
     this.matchedProduct.discountedPrice-= this.discPrice;
    }
  }
}
  plus(){
    this.count=this.count+1;

    if(this.matchedProduct.discountedPrice==null){
      this.matchedProduct.price +=this.price; 
    }
    else{
      this.matchedProduct.discountedPrice += this.discPrice;
    }
  }
  
}
