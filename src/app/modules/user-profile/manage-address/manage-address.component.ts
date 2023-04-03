import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {
  address:any;
  constructor(private cartService:CartService, private router:Router){
    this.address = this.cartService.address;
  }
  editAddress(){

  }
  addAddress(){
    this.router.navigate(['/profile/edit-address'])
  }
}
