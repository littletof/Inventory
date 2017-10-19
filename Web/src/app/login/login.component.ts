import { Component, OnInit } from '@angular/core';
import {AuthService} from "../backend-services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email: string;
  password: string;


  constructor(private auth: AuthService) {

  }

  ngOnInit() {
  }

  login(){
    this.auth.loginWithEmail(this.email, this.password, value=>{console.log(value);}, value=>{console.log(value)});
  }

  log(){
    console.log('hy');
  }

}
