import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Grocery } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';
import { CartItem } from 'src/app/shared/cartItemInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
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
    // this.cartService.subTotal.next(this.total);
  }

  // for checkout price 
  cartCheckoutPrice(){
    const subTotal = this.cartArray.map((product:any)=>product.subtotal)
    this.finalSubTotal = subTotal.reduce((acc:number,curr:number) => {
      return acc + curr;} ,0);
    this.GST = this.finalSubTotal*(10/100);
    this.total = this.finalSubTotal+this.GST;
    this.cartService.updateTotalPrice(this.total);
    // this.cartService.updateSubTotal(this.finalSubTotal);
  }

  // increase count
  plus(p: any) {
    let product = this.cartArray.find((res: any) => {
      return res.id === p.id;
    });
    if (product.quantityCount >= 0) {
      product.quantityCount += 1;
      product.subtotal = product.quantityCount * product.price;
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
      product.subtotal = product.quantityCount * product.price;
    }
    this.cartCheckoutPrice();
  }

  // remove product
  removeProduct(id: any) {
    let index = this.cartArray.findIndex((res: any) => {
      return id === res.id;
    });
    this.cartArray.splice(index, 1);
    this.cartCheckoutPrice();

  }

  routeToCheckout(){
    this.router.navigate(['/cart/checkout']);
  }
}
