import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
    constructor(private apiService:ApiService){
      this.apiService.getAllOrders().subscribe((res:any)=>{
        console.log(res);
      })
    }
}
