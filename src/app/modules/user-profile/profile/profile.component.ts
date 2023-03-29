import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: any;
 constructor(private fb:FormBuilder){
  this.profileForm=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    number:['', [Validators.required,Validators.pattern('[6789][0-9]{9}')]],
    altEmail:['', [ Validators.email]],
    altNumber:['', [ Validators.pattern('[6789][0-9]{9}')]],
    dob:['', Validators.required]
  }
  )
 }
 
 ngOnInit(){
  
 }
 
get firstName(){
  return this.profileForm.get('firstName')
}
get lastName(){
  return this.profileForm.get('lastName')
}
get email(){
  return this.profileForm.get('email')
}
get number(){
  return this.profileForm.get('number')
}
get altEmail(){
  return this.profileForm.get('altEmail')
}
get altNumber(){
  return this.profileForm.get('altNumber')
}
get dob(){
  return this.profileForm.get('dob')
}

}
