import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  passwordValidator } from '../validators/validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  options: any;
  changePasswordForm:FormGroup;
  constructor(private router:ActivatedRoute, private fb:FormBuilder){
    this.changePasswordForm = this.fb.group({
      currPassword:['', Validators.required],
      newPassword:['',[Validators.required, Validators.minLength(8)]],
      confirmNewPassword:['',Validators.required]
    }, {validators:passwordValidator})
    
  }
  get currPassword()
  {
    return this.changePasswordForm.get('currPassword')
  }
  get newPassword()
  {
    return this.changePasswordForm.get('newPassword')
  }
  get confirmNewPassword()
  {
    return this.changePasswordForm.get('confirmNewPassword')
  }
  
  ngOnInit(){
    this.router.params.subscribe((res)=>{
      this.options = res['i']
    })
  }
  
}
