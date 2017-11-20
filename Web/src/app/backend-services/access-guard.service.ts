import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable()
export class AccessGuardService implements CanActivate{




    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        //let roles = route.data["roles"] as Array<string>;
        //console.log('ACC: ', url);
        //console.log(this.auth.getUserData());

        if((route.data.anonym != null && this.auth.isAnonym()) || route.data.canAccess.indexOf(this.auth.getUserData().role)!=-1){
            //console.log('acc', true);
            return true;
        }else{


            //console.log('acc', false);
            this.router.navigate(['home']);

            return false;
        }
    }

}