import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from "../firebase-services/firebase-database.service"
import {Observable} from "rxjs/Observable";

import {FirebaseAuthService} from "../firebase-services/firebase-auth.service";
import {AuthService} from "../backend-services/auth.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

  providers: [FirebaseDatabaseService, FirebaseAuthService]
})
export class UsersComponent implements OnInit {
  users: Observable<any[]>;

  constructor(private fireDB: FirebaseDatabaseService, private auth: FirebaseAuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.users = this.fireDB.getUsers();
    }else {
      console.log('Not logged in');
    }

  }

  addNew(): void {
    this.fireDB.addUser();
  }
  removeUser(key): void {
    this.fireDB.removeUser(key);
  }

}
