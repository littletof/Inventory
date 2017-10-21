import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate{




  constructor(public auth: AuthService, public router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.auth.redirectUrl = url;

      this.router.navigate(['login']);

      return false;
    }
  }

}