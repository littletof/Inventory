import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevicesComponent} from "../devices/devices.component";
import {UsersComponent} from "../users/users.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {LoginComponent} from "../login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup',  component: SignUpComponent },
  { path: 'users',  component: UsersComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'devices',     component: DevicesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
