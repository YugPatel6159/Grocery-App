import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  // {
  //   path:'',component:UserProfileComponent
  // },
  // {
  //   path:'profile', component:ProfileComponent
  // },
  // {
  //   path:'profile/manage-Address', component:ManageAddressComponent
  // },
  // {
  //   path:'profile/change-password', component:ChangePasswordComponent
  // },
  // {
  //   path:'profile/orders', component:OrdersComponent
  // },
 {
  path:'profile', component:UserProfileComponent,canActivate:[AuthGuard], 
  children:[ 
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path:'', component:ProfileComponent
    },
    {
      path:'manage-Address', component:ManageAddressComponent
    },
    {
      path:'change-password', component:ChangePasswordComponent
    },
    {
      path:'orders', component:OrdersComponent
    }
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
