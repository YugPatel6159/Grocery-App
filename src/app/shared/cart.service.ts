import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Grocery } from './interface';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { CartItem } from './cartItemInterface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { 
  }
  productUrl=environment.baseUrl;
  myBehaviorSubject = new BehaviorSubject<Grocery[]>([]);
  cartItem = new BehaviorSubject<CartItem[]>([]);
  subTotal = new Subject<number>();
  cart = new Subject<any>();
  
  addProductToCart(product:any){
    return this.http.post(this.productUrl,product);
  }
  getProductToCart(){
    return this.http.get(this.productUrl);
  }


  cartArray:CartItem[]=[];
  existingProduct:any;
  getProducts(product:any){
    let cartItem:CartItem={
      id:Number(product.id),
      grocery_name:product.grocery_name,
      price: product.discountPrice ? product.discountPrice : product.price,
      quantity:product.quantity,
      subtotal:Number(product.discountPrice ? product.discountPrice : product.price),
      imageUrl: String(product.imageUrl),
      quantityCount:1
    }
   const existingItem = this.cartArray.find(res=> { 
    return res.id===cartItem.id
  })

  this.existingProduct = existingItem;
   console.log(existingItem);
   if(!existingItem){
  this.cartArray.push(cartItem);
   }
   else{
    existingItem.quantityCount+=cartItem.quantityCount;
    existingItem.subtotal=existingItem.quantityCount*existingItem.price;
   }
    return this.cartArray;
  }

}
