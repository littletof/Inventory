import { Component } from '@angular/core';
import {AuthService} from "./backend-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router){
    //this.auth.logOut((res)=> {});
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logOut((res)=>{});
    this.router.navigate(['login']);
  }
}
