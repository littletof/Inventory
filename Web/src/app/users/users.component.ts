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
  users: Observable<any[]>;

  constructor(private DB: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.users = this.DB.getUsers();
    }else {
      console.log('Not logged in');
    }

  }

  addNew(): void {
    this.DB.addUser();
  }
  removeUser(key): void {
    this.DB.removeUser(key);
  }

}
