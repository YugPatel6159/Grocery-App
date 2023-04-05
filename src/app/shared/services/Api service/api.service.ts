import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  allCategories = environment.allCategoryUrl;
  
  constructor( private http:HttpClient) { }
  baseUrl = environment.baseUrl;
  cartUrl = environment.cartUrl;
  changePasswordUrl= environment.changePassword;
  cartTotal = environment.getCartApi;
  addAddress = environment.addAddress;
  customerDetails:any;
  edituserDetails = environment.editUserDetails;
  addAddressApi=environment.addAddressToApi;
  getAllOrdersApi=environment.getOrdersApi;
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
    getUserDetails(){
      return this.http.get(this.baseUrl+environment.userDetails,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})})
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

    clearCart(): Observable<any> {
      return this.http.delete<any>(this.cartUrl);
    }

    postAddressData(address:any){
      return this.http.post(this.baseUrl+this.addAddress,address);
    } 
    
    addAddressToApi(address:any){
      return this.http.post(this.addAddressApi,address);
    }

    getAddressFromApi(){
      return this.http.get(this.addAddressApi);
    }

    deleteAddress(id:string){
      return this.http.delete(this.baseUrl+'customer/delete-customer-address',{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','address_id':id})})
    }
    editAddress(address:any,id:any){
      console.log(JSON.stringify(id))
      return this.http.put(this.baseUrl+'customer/update-customer-address',{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','address_id':id})},address)
    }
    getAllCategories(){
      return this.http.get(this.baseUrl+this.allCategories,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})});
    }
    editCustomer(userDetails:any){
      return this.http.put(this.baseUrl+this.edituserDetails,userDetails);
    }

    getAllOrders(){
      return this.http.get(this.baseUrl+this.getAllOrdersApi,{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'})});
    }
    getProductsByCategories(id:string){
      return this.http.get(this.baseUrl+'product/get-product-by-category-id',{headers: new HttpHeaders({'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*','category_id':id})})
    }
  }
  

