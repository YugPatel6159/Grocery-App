import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { Grocery } from 'src/app/shared/models/interface';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { CartItem } from 'src/app/shared/models/cartItemInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  categoryToShow: any;
  productByCategory: any;
  constructor(
    private service: ProductService,
    private cartService: CartService,
    private route:ActivatedRoute,
    private router:Router
  ) {}
  cartArray: any;
  cartArr: CartItem[] = [];
  finalSubTotal: number = 0;
  GST:number = 0;
  total:number = 0;
  totalByCategory=0;
  ngOnInit() {
    //  this.cartService.myBehaviorSubject.subscribe((res)=>{
    //     this.cartArray=res;
    //   })
    // this.cartService.getProductToCart().subscribe(res=>{
    //   this.cartArray = res;
    //   console.log(this.cartArray)
    // })
    this.cartService.cartItem.subscribe((res) => {
      this.cartArray = res;
    });
    console.log(this.cartArray);
    this.cartCheckoutPrice();
    this.cartData();
   
  }
  cartData(){
    let categoryToShow;
    categoryToShow= this.cartArray.map((product:any)=>product.category);
   this.categoryToShow = Array.from(new Set(categoryToShow))
    // console.log("catof cart",this.categoryToShow);  
   // this.cartService.subTotal.next(this.total);
     this.productByCategory = this.cartArray.reduce((result:any, product:any) => {
     (result[product.category] = result[product.category] || []).push(product);
     result[product.category].totalPrice = (result[product.category].totalPrice || 0) + product.price;
     return result;
   }, {});
   console.log('producproductByCategory',this.productByCategory)

   console.log('cts',this.categoryToShow)
  }
  // for checkout price 
  cartCheckoutPrice(){
    const subTotal = this.cartArray.map((product:any)=>product.subtotal)
    this.finalSubTotal = subTotal.reduce((acc:number,curr:number) => {
      return acc + curr;} ,0);
    // this.GST = this.finalSubTotal*(10/100);
    // this.total = this.finalSubTotal+this.GST;
    this.cartService.updateTotalPrice(this.finalSubTotal);
    // this.cartService.updateSubTotal(this.finalSubTotal);
  }

  // increase count
  plus(p: any) {
    let product = this.cartArray.find((res: any) => {
      return res.id === p.id;
    });
    if (product.quantityCount >= 0) {
      product.quantityCount += 1;
      if(product.discPrice){
        product.subtotal = product.quantityCount * product.discPrice;
      }
      else{
        product.subtotal = product.quantityCount * product.price;
      }
    }
    this.cartCheckoutPrice();
  }

  // decrrease count
  minus(p: any) {
    let product = this.cartArray.find((res: any) => {
      return res.id === p.id;
    });
    if (product.quantityCount >= 1) {
      product.quantityCount -= 1;
      if(product.discPrice){
        product.subtotal = product.quantityCount * product.discPrice;
      }
      else{
        product.subtotal = product.quantityCount * product.price;
      }
    }
    this.cartCheckoutPrice();
  }

  // remove product
  removeProduct(product: any) {
    const categoryArray = this.productByCategory[product.category];
    const index = categoryArray.indexOf(product);
    if (index > -1) {
      categoryArray.splice(index, 1);
      this.productByCategory[product.category].totalPrice -= product.price;
    }
    this.cartCheckoutPrice(); 
  }

  // removeProduct(id: any) {
  //   let index = this..findIndex((res: any) => {
    //     return id === res.id;
    //   });
    //   this.cartCheckoutPrice();
  //   this.cartArray.splice(index, 1);

  // }

  routeToCheckout(){
    this.router.navigate(['cart/checkout']);
  }
}
