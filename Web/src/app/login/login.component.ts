import { Component, OnInit } from '@angular/core';
import {AuthService} from "../backend-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email: string;
  password: string;


  constructor(private auth: AuthService, public router: Router) {

  }

  ngOnInit() {
  }

  onLogin(router){
    router.navigate(['/home']);
  }

  login(){
    this.auth.loginWithEmail(this.email, this.password, (res)=>{this.onLogin(this.router)}, value=>{console.log(value)});
  }

  loginAnonym(){
    this.auth.loginAnonym((res)=>{this.onLogin(this.router)});
  }

}
