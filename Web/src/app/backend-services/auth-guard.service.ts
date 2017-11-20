import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuardService implements CanActivate{




  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    //console.log(url + ': Checking is LoggedIN: ', this.auth.isLoggedIn());

    if(this.auth.isLoggedIn()){

        if(url == "/login" || url == "/register"){
            //console.log("shouldnt");
            this.router.navigate(['home']);
        }


      return true;
    }else{



      if(url != '/login' && url != '/register'){
          this.auth.redirectUrl = url;
          this.router.navigate(['login']);
          return false;
      }else{

      }

      //console.log('hy');

      return true;
    }
  }

}