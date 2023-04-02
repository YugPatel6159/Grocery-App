import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Grocery } from '../../models/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../models/cartItemInterface';
import { ApiService } from '../Api service/api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private apiService:ApiService) {}
  productUrl = environment.baseUrl;
  myBehaviorSubject = new BehaviorSubject<Grocery[]>([]);
  cartItem = new BehaviorSubject<any>([]);
  cartItem$ = this.cartItem.asObservable();

  subTotal = new BehaviorSubject<number>(0);
  cart = new Subject<any>();
  // total = new Subject<number>();

  // addProductToCart(product:any){
  //   return this.http.post(this.productUrl,product);
  // }
  // getProductToCart(){
  //   return this.http.get(this.productUrl);
  // }
  // totalPriceSource = new BehaviorSubject<number>(0);
  // totalPriceSource$ = this.totalPriceSource.asObservable();
  subTotal$ = this.subTotal.asObservable();
  
  // totalPrice$ = this.totalPriceSource.asObservable();
  updateTotalItems(cartArray:any){
    // this.cartItem.next(cartArray.length)
  }
  updateSubTotal(subTotal: number) {
    this.subTotal.next(subTotal);
  }

  cartArray!:any;
  existingProduct: any;
  getProducts(product: any) {
    let cartItem: CartItem = {
      id: Number(product.id),
      grocery_name: product.grocery_name,
      price:  product.price,
      discPrice:product.discountPrice,
      shop: product.store,
      category:product.category,
      quantity: product.quantity,
      subtotal: Number(
        product.discountPrice ? product.discountPrice : product.price
      ),
      imageUrl: String(product.imageUrl),
      quantityCount: 1,
    };
    // const existingItem = this.cartArray.find((res) => {
    //   return res.id === cartItem.id;
    // });

    // this.existingProduct = existingItem;
    // console.log(existingItem);
    // if (!existingItem) {
    //   this.cartArray.push(cartItem);
    // } else {
    //   existingItem.quantityCount += cartItem.quantityCount;
    //   existingItem.subtotal = existingItem.quantityCount * existingItem.price;
    // }
   this.apiService.addCartApi(cartItem);
  //  this.apiService.getCartData().subscribe(res=>{this.cartArray = res})
   return this.apiService.getCartData();

  }
  cartLength!:number;
  finalSubTotal!:number;
  addProductToCart(product: Grocery) {
    
    this.getProducts(product).subscribe(cartArray => {
     this.cartArray = cartArray;
     this.cartLength = cartArray.length;
     console.log('cartLength',this.cartLength)
     this.cartItem.next(this.cartLength);
     this.finalSubTotal = this.cartArray
       .map((product: any) => product.subtotal)
       .reduce((acc: number, curr: number) => {
         return acc + curr;
       }, 0);
     this.apiService.updateCartTotal(this.finalSubTotal);

       console.log('final subtotal from add to cart',this.finalSubTotal)
       this.subTotal.next(this.finalSubTotal);
   });
   
 }
  address = [
    {type:'Office',name:'Pritee Mehta', address:'Odell J. Gabbert 1045 Kildeer DriveNorfolk, VA 23502',},
    {type:'Home',name:'Pritee Mehta', address:'Thelma E. Rogers 3651 Burton AvenueMemphis, TN 38104'},
    {type:'Office',name:'Pritee Mehta', address:'Kathleen G. Hogan3516 Layman AvenueFayetteville, NC 28306'}
  ];
}
