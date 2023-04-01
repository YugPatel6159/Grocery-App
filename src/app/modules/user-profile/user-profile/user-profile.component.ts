import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  options: any;
  constructor(private router:Router){
  }
  ngOnInit(){
    
  }
  onLogout(){
      localStorage.removeItem('token');
      this.router.navigate([''])
  }
}
