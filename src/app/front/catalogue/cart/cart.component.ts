import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Grocery } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';
import { CartItem } from 'src/app/shared/cartItemInterface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private service:ProductService, private cartService:CartService){
  }
  cartArray:any;
  cartArr:CartItem[]=[];
  finalSubTotal:number=0
  
  ngOnInit(){
  //  this.cartService.myBehaviorSubject.subscribe((res)=>{
  //     this.cartArray=res;
  //   })
    // this.cartService.getProductToCart().subscribe(res=>{
    //   this.cartArray = res;
    //   console.log(this.cartArray)
    // })
   this.cartService.cartItem.subscribe((res)=>{this.cartArray=res})
      console.log(this.cartArray)
    let finalSubTotal =0;
    this.finalSubTotal = this.cartArray.forEach((res:any)=>{
      return finalSubTotal += res.subtotal
    })

    
  }
  plus(p:any){
    let product = this.cartArray.find((res:any)=>{
      return res.id===p.id
    })
    if(product.quantityCount>=0){
      product.quantityCount+=1;
      product.subtotal = product.quantityCount*product.price;
    }
    
  }

  minus(p:any){
    let product = this.cartArray.find((res:any)=>{
      return res.id===p.id
    })
    if(product.quantityCount>=1){
      product.quantityCount-=1;
    product.subtotal = product.quantityCount*product.price;
    }
    
  }
  
  removeProduct(id:any){

    let index=this.cartArray.findIndex((res:any)=>{
      return id === res.id
    })
    this.cartArray.splice(index,1);
  }

}
