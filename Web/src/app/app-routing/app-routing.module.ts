import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevicesComponent} from "../devices/devices.component";
import {UsersComponent} from "../users/users.component";
import {LoginComponent} from "../login/login.component";
import {AuthGuardService as AGS } from "../backend-services/auth-guard.service";
import { AccessGuardService as ACC } from "../backend-services/access-guard.service";

import {RegisterComponent} from "../register/register.component";
import {HomeComponent} from "../home/home.component";
import {UserLendingsComponent} from "../lendings/lendings.component";
import {RequestsComponent} from "../requests/requests.component";

const routes: Routes = [


    { path: 'home', component: HomeComponent, canActivate: [AGS, ACC],
        data:{canAccess: ['admin', 'user'], anonym: true} },

    { path: 'users', component: UsersComponent, canActivate: [AGS, ACC],
        data:{canAccess: ['admin']} },

    { path: 'devices', component: DevicesComponent, canActivate: [AGS, ACC],
        data:{canAccess: ['admin', 'user'], anonym: true} },

    { path: 'lendings', component: UserLendingsComponent, canActivate: [AGS, ACC],
        data:{canAccess: ['admin', 'user']}},

    { path: 'requests', component: RequestsComponent, canActivate: [AGS, ACC],
        data:{canAccess: ['admin', 'user']}},



  { path: 'register',  component: RegisterComponent, canActivate:[AGS]},
  { path: 'login',  component: LoginComponent, canActivate:[AGS]},

    { path: '', redirectTo: '/login', pathMatch: 'full' }




];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})



export class AppRoutingModule { }
