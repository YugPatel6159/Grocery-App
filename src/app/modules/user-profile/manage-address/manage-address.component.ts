import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';


@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent {
  address:any;
  constructor(private cartService:CartService, private router:Router, private apiService:ApiService,private toastr: ToastrService){
    this.apiService.getAddressFromApi().subscribe((res)=>{
      this.address = res
    })

  }
  deleteAddress(id:any){
    this.apiService.deleteAddress(id).subscribe(()=>{
      this.toastr.success('Address Deleted', 'Success');
      this.apiService.getAddressFromApi().subscribe((res)=>{
        this.address = res
      })
    })
  }
  editAddress(id:number){
    this.router.navigate(['profile/edit-address',id])
  }
  addAddress(){
    this.router.navigate(['profile/add-address'])
  }
}
