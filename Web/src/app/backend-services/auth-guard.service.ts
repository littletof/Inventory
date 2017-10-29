import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthGuardService implements CanActivate{




  constructor(public auth: AuthService, public router: Router) { }


   /* private loggedIn: boolean = false;

    constructor(
        private router: Router,
        private af: AngularFireAuth,
    ) {
        af.authState.subscribe(res => this.onAuthChange(res));
    }

    private onAuthChange(auth) {
        this.loggedIn = auth ? true : false;
    }

    canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
        if (this.loggedIn) {
            return true;
        }
        console.log('Route blocked by AuthGuardService');
        this.router.navigate(['/login']);
        return false;
    }*/


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    if(this.auth.isLoggedIn()){
      return true;
    }else{

      this.auth.redirectUrl = url;

      //console.log("redirect now", url);

      this.router.navigate(['login']);

      return false;
    }
  }

}