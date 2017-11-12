import { Injectable } from '@angular/core';



import {AngularFireDatabase} from "angularfire2/database";
import { Observable } from 'rxjs/Rx';
import {User} from "../user";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {LendEntry} from "../lend-entry";



@Injectable()
export class FirebaseDatabaseService implements DatabaseService{

  users: any[] = [];


  devices: any[] = [];


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

  getDevicesWithTag(tag): any{
      return this.db.list<Device>('devices', (query) => {
          return query.orderByChild('tags').equalTo(tag);
      }).snapshotChanges();
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

        let devref =this.db.database.ref('devices/'+lendEntry.device_id);

        devref.transaction(data => {
            /*Available quantity decreasing*/
            if(data.quantity_available - lendEntry.device_quantity >= 0) {
                devref.update({quantity_available: data.quantity_available - lendEntry.device_quantity});


                /*add new lend entry*/
                this.db.list('lendings/present_lendings').push(lendEntry)
                    .then(value => {
                        //this.db.list('users/'+ lendData.user_id + '/present_lendings').push(value.key);

                        /*add lend to user*/
                        this.db.object('users/'+ lendData.user_id + '/present_lendings/'+value.key).set(true);


                    });


            }
        });






      /*console.log("now", data.payload.val());
      if(data.payload.val() >0) {

          this.db.object('devices/' + lendEntry.device_id + "/quantity_available").set(data.payload.val() - 1);

      }*/

/*

          */
  }

  refreshQuantity(id, value){

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
