import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Grocery } from '../../models/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../models/cartItemInterface';
import { ApiService } from '../Api service/api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private apiService:ApiService,private toastr: ToastrService) {}
  cartItem = new BehaviorSubject<any>([]);
  cartItem$ = this.cartItem.asObservable();
  subTotal = new BehaviorSubject<number>(0);
  subTotal$ = this.subTotal.asObservable();

  header = new BehaviorSubject<boolean>(false);
  header$ = this.header.asObservable();

  
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
   this.apiService.addCartApi(cartItem);
   return this.apiService.getCartData();
  }
  cartLength!:number;
  finalSubTotal!:number;
  addProductToCart(product: Grocery) {
    
    this.getProducts(product).subscribe((res) => {
     this.cartArray = res;
     this.cartLength = res.length;
     this.cartItem.next(this.cartLength);
     this.finalSubTotal = this.cartArray
       .map((product: any) => product.subtotal)
       .reduce((acc: number, curr: number) => {
         return acc + curr;
       }, 0);
     this.apiService.updateCartTotal(this.finalSubTotal);
       this.subTotal.next(this.finalSubTotal);
       this.toastr.success('product added to cart','Success')
   },
   (err)=>{
    this.toastr.error(err.error.message,'error')
   });
   
 }
  address = [
    {type:'Office',name:'Pritee Mehta', address:'Odell J. Gabbert 1045 Kildeer DriveNorfolk, VA 23502',},
    {type:'Home',name:'Pritee Mehta', address:'Thelma E. Rogers 3651 Burton AvenueMemphis, TN 38104'},
    {type:'Office',name:'Pritee Mehta', address:'Kathleen G. Hogan3516 Layman AvenueFayetteville, NC 28306'}
  ];
}
