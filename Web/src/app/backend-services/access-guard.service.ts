import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable()
export class AccessGuardService implements CanActivate{


    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        //bizonyos contentek védelme, csak a paraméterként kapott felhasználói típusoknak engedi a componens megnyitását
        if((route.data.anonym != null && this.auth.isAnonym()) || route.data.canAccess.indexOf(this.auth.getUserData().role)!=-1){

            return true;
        }else{

            this.router.navigate(['home']);

            return false;
        }
    }

}