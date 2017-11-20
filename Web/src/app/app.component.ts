import { Component } from '@angular/core';
import {AuthService} from "./backend-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router){

  }

  getName(): string{
      if(this.auth.getUserData()){
          return this.auth.getUserData().name;
      }
      return "Anonymus";
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logOut((res)=>{});
    this.router.navigate(['login']);
  }
}
