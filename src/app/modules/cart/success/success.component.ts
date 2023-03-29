import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor(private service:CartService){
    this.service.cartItem.next([]);
    this.service.subTotal.next(0);
  }
}
