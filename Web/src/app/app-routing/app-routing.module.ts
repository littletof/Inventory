import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {DevicesComponent} from "../devices/devices.component";
import {UsersComponent} from "../users/users.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuardService as AGS} from "../backend-services/auth-guard.service";
import {RegisterComponent} from "../register/register.component";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AGS] },
    { path: 'users', component: UsersComponent, canActivate: [AGS] },
    { path: 'devices', component: DevicesComponent, canActivate: [AGS] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'register',  component: RegisterComponent},
  { path: 'login',  component: LoginComponent}




];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
