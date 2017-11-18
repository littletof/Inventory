import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {DevicesComponent} from "../devices/devices.component";
import {UsersComponent} from "../users/users.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuardService as AGS} from "../backend-services/auth-guard.service";
import {RegisterComponent} from "../register/register.component";
import {HomeComponent} from "../home/home.component";
import {UserLendingsComponent} from "../user-lendings/user-lendings.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AGS] },
    { path: 'users', component: UsersComponent, canActivate: [AGS] },
    { path: 'devices', component: DevicesComponent, canActivate: [AGS] },
    { path: 'lendings', component: UserLendingsComponent, canActivate: [AGS] },



  { path: 'register',  component: RegisterComponent},
  { path: 'login',  component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }




];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
