import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {DevicesComponent} from "../devices/devices.component";
import {UsersComponent} from "../users/users.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuardService as AGS} from "../backend-services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'register',  component: SignUpComponent },
  { path: 'login',  component: LoginComponent },


  { path: 'users', component: UsersComponent, canActivate: [AGS] },
  { path: 'devices', component: DevicesComponent, canActivate: [AGS] },
  { path: 'home', component: DevicesComponent, canActivate: [AGS] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
