import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { Grocery } from 'src/app/shared/models/interface';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { CartItem } from 'src/app/shared/models/cartItemInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  categoryToShow: any;
  productByCategory: any;
  totalPrice: any;
  cartLength: any;
  constructor(
    private service: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.cartData();
  }
  finalSubTotal: number = 0;
  cartApiData: any;
  ngOnInit() {
  }

  productByCategories() {
    let categoryToShow = this.cartApiData.map((product: any) => product.category);
    this.categoryToShow = Array.from(new Set(categoryToShow));
    console.log('cat of cart', this.categoryToShow);
    this.productByCategory = this.cartApiData.reduce(
      (result: any, product: any) => {
        (result[product.category] = result[product.category] || []).push(
          product
        );
        if (product.discPrice == null) {
          result[product.category].totalPrice =
            (result[product.category].totalPrice || 0) + product.price*product.quantityCount;
          return result;
        } else {
          result[product.category].totalPrice =
            (result[product.category].totalPrice || 0) + product.discPrice*product.quantityCount;
          return result;
        }
      },
      {}
    );
  }

  cartData() {
    this.apiService.getCartData().subscribe((res) => {
      this.cartApiData = res;
      this.productByCategories();
      this.cartCheckoutPrice();
    });

  }
  // for checkout price
  cartCheckoutPrice() {
    console.log("call");
    const subTotal = this.cartApiData.map((product: any) => product.subtotal);
    this.finalSubTotal = subTotal.reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);
    console.log('fial', this.finalSubTotal)
    this.apiService.updateCartTotal(this.finalSubTotal)
    this.cartService.updateSubTotal(this.finalSubTotal);
  }

  // increase count
  plus(products: any) {
    let product = this.cartApiData.find((res: any) => {
      return res.id === products.id;
    });

    if (product.quantityCount >= 0) {
      product.quantityCount += 1;
      if (product.discPrice) {
        product.subtotal = product.quantityCount * product.discPrice;
      } else {
        product.subtotal = product.quantityCount * product.price;
      }
    }
    if(product.discPrice==null){
      this.productByCategory[product.category].totalPrice=this.productByCategory[product.category].totalPrice+product.price;
    }
    else{
      this.productByCategory[product.category].totalPrice=this.productByCategory[product.category].totalPrice+product.discPrice;

    }
    this.apiService.updateCartData(products.id, product.quantityCount, product.subtotal);
    this.cartCheckoutPrice();
  }

  // decrrease count
  minus(products: any) {
    let product = this.cartApiData.find((res: any) => {
      return res.id === products.id;
    });
    if (product.quantityCount >= 1) {
      product.quantityCount -= 1;
      if (product.discPrice) {
        product.subtotal = product.quantityCount * product.discPrice;
      } else {
        product.subtotal = product.quantityCount * product.price;
      }
    }
    // this.productByCategories()
    if(product.discPrice==null){
      this.productByCategory[product.category].totalPrice=this.productByCategory[product.category].totalPrice-product.price;
    }
    else{
      this.productByCategory[product.category].totalPrice=this.productByCategory[product.category].totalPrice-product.discPrice;

    }

    this.apiService.updateCartData(products.id, product.quantityCount, product.subtotal);
    this.cartCheckoutPrice();
  }

  // remove product

  removeProduct(product: any){
    const categoryArray = this.productByCategory[product.category];
    this.apiService.deleteCartData(product.id).subscribe(()=>{
      this.apiService.getCartData().subscribe(cartArray =>{
        this.cartApiData = cartArray
        this.cartService.cartItem.next(this.cartApiData.length)
        console.log("after remove of product",this.cartApiData)
      });
    });

    const index = categoryArray.indexOf(product);
    if (index > -1) {
      categoryArray.splice(index, 1);
      this.productByCategory[product.category].totalPrice -= product.price;
    }
    this.finalSubTotal = this.finalSubTotal - product.subtotal
    this.apiService.updateCartTotal(this.finalSubTotal)
    this.cartService.subTotal.next(this.finalSubTotal);
  }

  routeToCheckout() {
    this.router.navigate(['cart/checkout']);
  }
}
