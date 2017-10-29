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

  devices: any[] = [];
  devicesObs: Observable<any[]>;



  constructor(private db: AngularFireDatabase) {
      this.loadFireUsers();
      this.loadFireDevices();

      this.getFireDevices().stateChanges().subscribe(value => {
          console.log(value.type);
          if(value.type == "child_removed"){
              console.log("remove");
              this.loadFireDevices();
          }
      });
  }




// -- USERS --

  loadFireUsers(){
      this.getFireUsers().snapshotChanges().subscribe(actions => {
          actions.forEach(action => {
              // console.log(action.payload.val());
              this.usersObs = this.getFireUserByKey(action.key).valueChanges();

              this.usersObs.subscribe(res => {
                  const $key = action.key;
                  if(!this.inArray(this.users, $key)) {
                      this.users.push({key: $key, ...res});
                  }
              });
          });
      });
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

  //-- ^^ works ^^




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


  // -- USERS END --

  // -- DEVICES --
  loadFireDevices(){
      this.getFireDevices().snapshotChanges().subscribe(actions => {
          actions.forEach(action => {
              // console.log(action.payload.val());
              this.devicesObs = this.getFireDeviceByKey(action.key).valueChanges();
              this.devicesObs.subscribe(res => {
                  const $key = action.key;

                  if(!this.inArray(this.devices, $key)) {
                      this.devices.push({key: $key, ...res});
                  }else{
                      console.log("already in");
                  }
              });
          });
      });
  }

  getFireDevices(): AngularFireList<any[]>{
        return this.db.list('devices');
  }

  getFireDeviceByKey(key): AngularFireObject<any>{
        return this.db.object('devices/' + key);
  }

  getDevices(): any{
      return this.devices;
      //return this.getFireDevices();
  }

  removeDevice(key): void {
      this.db.object('devices/' + key).remove();
  }

  tryDev(){
      return this.devicesObs;
  }

  // -- DEVICES END --


  //Util

  inArray(array, key): boolean{
    for(let i = 0; i < array.length; i++){
      if(array[i].key == key){
        return true;
      }
    }
    return false;
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
