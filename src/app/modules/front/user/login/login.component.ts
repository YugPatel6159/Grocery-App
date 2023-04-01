import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData } from 'src/app/shared/models/logindata';
import { ApiService } from 'src/app/shared/services/Api service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  constructor(private fb:FormBuilder, private apiService:ApiService, private router:Router){
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
    this.apiService.loginUser(loginData).subscribe((data:any)=>{
      // alert('login Successfull')
      console.log(data.data);

    localStorage.setItem('token',data.data)
    this.router.navigate([''])
      console.log(loginData)
  },
    (err:any)=>{
      console.log(err)
      alert(err.error.message)
    });;

 }
  
}
