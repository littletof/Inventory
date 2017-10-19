import { Injectable } from '@angular/core';



import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

import {User} from "../user";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";


@Injectable()
export class FirebaseDatabaseService implements DatabaseService{

  constructor(private db: AngularFireDatabase) { }

  addUser(): void {
    this.db.list('users').push(new User("insertTest", "email",  13));
  }

  addUserWithKey(user: User, key: string) {
    this.db.object(`users/${key}`).set(user);
  }

  removeUser(user): void {
    this.db.list('/users').remove(user);
  }

  getUsers(): Observable<any[]> {
    return this.db.list('users').valueChanges();
  }
  getDevices(): Observable<Device[]> {
    return this.db.list('devices').valueChanges();
  }

}
