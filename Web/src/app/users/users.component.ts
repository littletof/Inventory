import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from "../firebase-services/firebase-database.service"
import {Observable} from "rxjs/Observable";

import {FirebaseAuthService} from "../firebase-services/firebase-auth.service";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private db: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.users = this.db.getUsers();
    }else {
      console.log('Not logged in');
    }

  }

  removeUser(user){
    //this.getMethods(this.db.getMyUsers());
    //this.db.getMyUsers().remove(user);

  }

    getMethods(obj): void{
        var res = [];
        for(var m in obj) {
            if(typeof obj[m] == "function") {
                res.push(m)
            }
        }
        console.log(res);
    }

}
