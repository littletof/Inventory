import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuardService implements CanActivate{




  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    //ha már be van jelentkezve és login/register pagen lenne, redirect home
    if(this.auth.isLoggedIn()){

        if(url == "/login" || url == "/register"){
            this.router.navigate(['home']);
        }

      return true;
    }else{

      //ha nincs bejelentkezve, elmenti az url-t amit meg akartunk látogatni, és redirect login/register
      if(url != '/login' && url != '/register'){
          this.auth.redirectUrl = url;
          this.router.navigate(['login']);
          return false;
      }else{

      }

      return true;
    }
  }

}