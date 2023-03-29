import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { loginData } from 'src/app/shared/models/logindata';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  constructor(private fb:FormBuilder, private apiService:ApiService){
   this.loginForm=this.fb.group({
     userName:['', Validators.required],
     password:['', Validators.required]
   }
   )
  }
  ngOnInit(){
  }
 get userName(){
   return this.loginForm.get('userName')
 }
 get password(){
  return this.loginForm.get('password')
 }
 loginUser(){
  const loginData:loginData={
    username: this.userName.value,
    password: this.password.value
  }
    this.apiService.loginUser(loginData);
    console.log(loginData)
 }
  
}
