import { Injectable } from '@angular/core';



import {AngularFireDatabase, AngularFireList, AngularFireObject, snapshotChanges} from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

import {User} from "../user";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";


@Injectable()
export class FirebaseDatabaseService implements DatabaseService{
    users: any[] = [];
  usersObs: Observable<any[]>;


  constructor(private db: AngularFireDatabase) {
      this.getFireUsers().snapshotChanges().subscribe(actions => {

          actions.forEach(action => {
              // console.log(action.payload.val());
              this.usersObs = this.getFireUserByKey(action.key).valueChanges();

              this.usersObs.subscribe(res => {
                  //console.log('res', res);
                  /*res.forEach(element => {
                      this.restaurants.push(element);
                  });*/

                  const $key = action.key;
                  if(!this.inArray(this.users, $key)) {
                      this.users.push({key: $key, ...res});
                  }
              });
          });
      });
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


  getFireUsers(): AngularFireList<any[]>{
      return this.db.list('users');
  }
  getFireUserByKey(key): AngularFireObject<any>{
      return this.db.object('users/' + key);
  }

  getUsers(): any[] {
      return this.users;
  }


  addUser(): void {
    this.db.list('users').push(new User("insertTest", "email",  13));
  }

  addUserWithKey(user: User, key: string) {
    this.db.object(`users/${key}`).set(user);
  }

  removeUser(user): void {
    this.db.list('/users').remove(user);
  }





  getUser(key): Observable<User>{
    //TODO
    return null;
  }

  getDevices(): Observable<Device[]> {
    return this.db.list('devices').valueChanges();
  }


  //Util

  inArray(array, key): boolean{
    for(let i = 0; i < array.length; i++){
      if(array[i].key == key){
        return true;
      }
    }
    return false;
  }
}
