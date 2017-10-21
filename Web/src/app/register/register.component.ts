import { Component, OnInit } from '@angular/core';
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {Router} from "@angular/router";
import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    email: string;
    password: string;
    name: string;
    role: number;
    hide = true;

  constructor(public auth: AuthService, public db: DatabaseService, public router: Router) { }

  ngOnInit() {
  }

  registerUser() {
        this.auth.registerUser(this.email, this.password, new User(this.name, this.email, this.role),
            ()=> {this.onRegister(this.router)});
  }

  onRegister(router){

      let url = null;
      if(this.auth.redirectUrl=='/register' || this.auth.redirectUrl==undefined){
          url = '/home';
      }else{
          url = this.auth.redirectUrl;
      }
      this.auth.redirectUrl=null;
      router.navigate([url]);
  }

}
