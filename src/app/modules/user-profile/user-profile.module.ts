import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './manage-address/edit-address/edit-address.component';
// import { SidebarComponent } from './Layouts/sidebar/sidebar.component';


@NgModule({
  declarations: [
    // SidebarComponent
    ProfileComponent,
    OrdersComponent,
    ManageAddressComponent,
    ChangePasswordComponent,
    EditAddressComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
