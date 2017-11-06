import { Injectable } from '@angular/core';



import {AngularFireDatabase} from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import {User} from "../user";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {LendEntry} from "../lend-entry";

import * as _ from "lodash";


@Injectable()
export class FirebaseDatabaseService implements DatabaseService{

  users: any[] = [];
  usersObs: Observable<any[]>;

  devices: any[] = [];
  devicesObs: Observable<any[]>;

    access_db = null;

  constructor(private db: AngularFireDatabase) {
      this.access_db = db;
  }

  tryDev(){}


// -- USERS --

  getUsers(): any {
      return this.db.list('users').snapshotChanges();
  }

  addUserWithKey(user: User, key: string) {
      this.db.object(`users/${key}`).set(user);
  }

  //-- ^^ works ^^

  removeUser(user): void {
    this.db.list('/users').remove(user);
  }

  getUser(key): Observable<User>{
    //TODO
    return null;
  }


  // -- USERS END --

  // -- DEVICES --

  getDevices(): any{
      return this.db.list<Device>('devices').snapshotChanges();
      //return this.devices;
  }


  addDevice(device): any{
        this.db.list('devices').push(device);
  }

  editDevice(): any{

  }

  getDevice(key): any{
        return this.db.object('devices/' + key).snapshotChanges();
  }

  removeDevice(key): void {
      this.db.object('devices/' + key).remove();
  }

  //-- LENDING

  lendDevice(lendData){
      let lendEntry = {
          user_id: lendData.user_id,
          device_id: lendData.device_id,
          start_date: lendData.start_date.getTime(),
          end_date: lendData.end_date.getTime(),
          device_quantity: lendData.device_quantity,
          comment: lendData.comment

      };

      this.db.list('lendings/present_lendings').push(lendEntry)
          .then(value => {


              //this.db.list('users/'+ lendData.user_id + '/present_lendings').push(value.key);

              this.db.object('users/'+ lendData.user_id + '/present_lendings/'+value.key).set(true);


          });
  }

  getLendingsOfUser(userkey): any{
      let reff = this.db.list<LendEntry>("lendings/present_lendings/", ref => ref.orderByChild('user_id').equalTo(userkey));

      return reff.snapshotChanges();
  }

  getLending(lendkey){

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
