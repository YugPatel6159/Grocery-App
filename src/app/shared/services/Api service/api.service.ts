import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }
  baseUrl = environment.baseUrl;
  registerUser(userData:any){
    const registerUrl = environment.registerUrl;
    this.http.post(this.baseUrl+registerUrl,userData).subscribe(res=>console.log(res),err=>console.log(err));
    }
  
    loginUser(userData:any){
      const loginUrl = environment.loginUrl;
      this.http.post(this.baseUrl+loginUrl,userData).subscribe(res=>console.log(res),err=>console.log(err));
    }

  }

