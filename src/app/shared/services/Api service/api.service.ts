import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }
  baseUrl = environment.baseUrl;
  cartUrl = environment.cartUrl;
  changePasswordUrl= environment.changePassword;
  cartTotal = environment.getCartApi;
  registerUser(userData:any){
    const registerUrl = environment.registerUrl;
    this.http.post(this.baseUrl+registerUrl,userData).subscribe(res=>console.log(res),err=>console.log(err));
    }
  
    loginUser(userData:any){
      const loginUrl = environment.loginUrl;
      return this.http.post(this.baseUrl+loginUrl,userData)
    }

    addCartApi(product:any){
      console.log("Api service",product);
      this.http.post(this.cartUrl, product).subscribe(
        {next:res=>console.log(res),
        error: err=>console.log(err)})
    }
    customerDetails:any;
    getUserDetails(){
      this.http.get(this.baseUrl+environment.userDetails).subscribe(data=>{this.customerDetails = data});
      return this.customerDetails;
    }
    changePassword(newPassword:any){
      return this.http.put(this.baseUrl+this.changePasswordUrl,newPassword);
    }

    getCartData(){
      return this.http.get<any>(this.cartUrl);
    }

    updateCartData(id:number,quantityCount:number,subtotal:number){
      console.log(id)
      this.http.get(this.cartUrl+'/'+id).subscribe(res=>{
        const product=res;
        const count={...product,subtotal:subtotal,quantityCount:quantityCount};
        return this.http.put(this.cartUrl+'/'+id,count).subscribe(res=>res);
      });
    }

    deleteCartData(id:number):Observable<any>{
        return this.http.delete(this.cartUrl+'/'+id);
    }

    getCartTotal(){
      return this.http.get(this.cartTotal);
    }

    updateCartTotal(subtotal:number){
      const data = {
        subTotal:{
          subtotal:subtotal
        }
      }
       this.http.put(this.cartTotal,data).subscribe(
        {next:res=>console.log("res from patch",res),
        error: err=>console.log(err)})
    }

    
  }
  

