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
  email: string = '';
  password: string = '';

  errorText:string;

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {}

  //Home or redirect to previous page
  onLogin(router){
    let url = null;
    if(this.auth.redirectUrl=='/login' || this.auth.redirectUrl==undefined){
      url = '/home';
    }else{
      url = this.auth.redirectUrl;
    }



    this.auth.redirectUrl=null;

    router.navigate([url]);
  }

  login(){
    this.errorText=null;
    this.auth.loginWithEmail(this.email, this.password,
        (res)=>{this.onLogin(this.router)},
        error=>{this.errorText = error.message;});
  }

  loginAnonym(){
    this.auth.loginAnonym((res)=>{this.onLogin(this.router)});
  }

}
