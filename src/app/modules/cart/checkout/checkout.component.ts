import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
total:number=0;
  constructor(private cartService:CartService, private router:Router, private route:ActivatedRoute){
    this.cartService.totalPrice$.subscribe((price) => {
      this.total = price;
  });
  }
  addresses= this.cartService.address;
    ngOnInit(){
  
    }
placeOrder(){
  this.router.navigate(['cart/checkout/success']);
}
cancelOrder(){
  if(confirm('Are you sure you want to cancel the order?')){
    this.cartService.cartItem.next([]);
    this.cartService.subTotal.next(0);
  this.router.navigate(['']);

  }
}

}
