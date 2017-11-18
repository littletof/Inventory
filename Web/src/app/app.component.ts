import { Component } from '@angular/core';
import {AuthService} from "./backend-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  anonym: any;
  email: string;
  constructor(public auth: AuthService, private router: Router){
    //this.auth.logOut((res)=> {});
      /*this.auth.check();
      console.log('whole C ', this.isLoggedIn());*/
      if(localStorage.getItem("anonym") == null){
          this.anonym = false;
      }else{
          this.anonym = true;
      }
  }

  getEmail(): string{
    if(this.auth.userDetails){
      return this.auth.userDetails.email;
    }
    return "";
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logOut((res)=>{});
    this.router.navigate(['login']);
  }
}
