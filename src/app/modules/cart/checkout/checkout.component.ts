import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
total:number=0;
  constructor(private cartService:CartService, private router:Router, private route:ActivatedRoute, private apiService:ApiService){
    // this.cartService.address$.subscribe(res=>{
    //   this.addresses = res.data.addresses
    // })
  }
  addresses:any;
    ngOnInit(){
      // debugger
  this.apiService.getCartTotal().subscribe((res:any)=>{this.total = res['subTotal']['subtotal'];})
  // this.cartService.subTotal$.subscribe(res=>this.total=res)
  
    }
    
placeOrder(){
  this.apiService.clearCart().subscribe(()=>
  console.log('car is cleared')
  );
  this.router.navigate(['cart/checkout/success']);
}

cancelOrder(){
  if(confirm('Are you sure you want to cancel the order?')){
    this.cartService.subTotal.next(0);
    this.router.navigate(['']);
  }
}
}
