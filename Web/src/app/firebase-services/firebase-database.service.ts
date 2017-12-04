import { Injectable } from '@angular/core';



import {AngularFireDatabase} from "angularfire2/database";
import { Observable } from 'rxjs/Rx';
import {User} from "../user";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {LendEntry} from "../lend-entry";
import * as firebase from "firebase";
import {RequestEntry} from "../request-entry";



@Injectable()
export class FirebaseDatabaseService implements DatabaseService{

  access_db = null;

  constructor(private db: AngularFireDatabase) {
      this.access_db = db;
  }


// -- USERS --

  getUsers(): any {
      return this.db.list('users').snapshotChanges();
  }

  addUserWithKey(user: User, key: string, callback = null) {
      this.db.object(`users/${key}`).set(user).then(callback);
  }

  //-- ^^ works ^^

  removeUser(user): void {
    this.db.list('/users').remove(user);
  }

    getUser(uid: string):any {
        return this.db.object('users/' + uid);
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
  updateDevice(uid, device): any{

      this.db.object('devices/'+ uid).set(device);
  }

  getDevice(key): any{
        return this.db.object('devices/' + key).snapshotChanges();
  }

  removeDevice(key): void {
      this.db.object('devices/' + key).remove();
  }



    getImage(img, callback): any{
        firebase.storage().ref('images/'+img + '.png').getDownloadURL().then((val)=> {
            callback(val);
        });
    }

  // -- DEVICES END --

  //-- LENDING

  lendDevice(lendData, isRequest){
      let lendEntry = {
          user_id: lendData.user_id,
          device_id: lendData.device_id,
          start_date: lendData.start_date.getTime(),
          end_date: lendData.end_date.getTime(),
          device_quantity: lendData.device_quantity,
          comment: lendData.comment,
          imei: lendData.imei
      };

        let devref =this.db.database.ref('devices/'+lendEntry.device_id);

        devref.transaction(data => {
            //Available quantity decreasing
            if(data.quantity_available - lendEntry.device_quantity >= 0 || isRequest) {
                if(!isRequest) {
                    devref.update({quantity_available: data.quantity_available - lendEntry.device_quantity});
                }


                for(let i in lendData.imei) {
                    devref.child('imei').child(i).child('available').set(false);
                }


                //add new lend entry
                this.db.list('lendings/present_lendings').push(lendEntry)
                    .then(value => {
                        //this.db.list('users/'+ lendData.user_id + '/present_lendings').push(value.key);

                        //add lend to user
                        this.db.object('users/'+ lendData.user_id + '/present_lendings/'+value.key).set(true);
                    });
            }
        });
  }

    returnLendDevice(lendData){
        let lendKey = lendData.lend.key;
        let shouldSave = LendEntry.getJSON(lendData.lend);
        delete shouldSave.key;

        let imeiData = lendData.return.imeis;

        let lendingRef = this.db.database.ref('lendings');
        let userRef = this.db.database.ref('users').child(lendData.lend.user_id);
        let deviceRef = this.db.database.ref('devices').child(lendData.lend.device_id);



        lendingRef.transaction(data => {
            //Remove from present
            lendingRef.child('present_lendings').child(lendKey).set({});
            userRef.child('present_lendings').child(lendKey).set({});

            //Move to past
            lendingRef.child('past_lendings').child(lendKey).set(shouldSave);
            userRef.child('past_lendings').child(lendKey).set(true);

            //Increase number
            deviceRef.transaction(data => {
                let newValue = Math.min(data.quantity_available+shouldSave.device_quantity, data.quantity_total);
                //console.log("min value of ", data.quantity_available+shouldSave.device_quantity," ",data.quantity_total);

                deviceRef.child('quantity_available').set(newValue);

                imeiData.forEach((imei) => {
                    let imeiRef = deviceRef.child('imei').child(imei.imei);
                    imeiRef.child('available').set(true);
                    imeiRef.child('comments').push(imei.comment);
                });

            });


        });
    }

    getLendingsOfUser(userkey): any{
        let reff = this.db.list<LendEntry>("lendings/present_lendings/", ref => ref.orderByChild('user_id').equalTo(userkey));

        return reff.snapshotChanges();
    }

    getLendings(): any{
        let reff = this.db.list<LendEntry>("lendings/present_lendings/");

        return reff.snapshotChanges();
    }
// -- LENDINGS END --

// -- REQUESTS --

    requestDevice(requestData: RequestEntry): any{
        let devref =this.db.database.ref('devices/'+requestData.device_id);

        return devref.transaction(data => {

            if(data.quantity_available - requestData.device_quantity >= 0) {
                devref.update({quantity_available: data.quantity_available - requestData.device_quantity});


                this.db.list("requests").push(requestData.toDBJSON());

            }else{
                throw new Error('Trying to request more than available');
            }

        });
    }

  deleteRequest(requestID){
    this.db.object('requests/' + requestID).set({});
  }

  cancelRequest(requestData){

      let request = requestData.request;

      let deviceRef = this.db.database.ref('devices').child(request.device_id);
      deviceRef.transaction(data => {
          let newValue = Math.min(data.quantity_available+request.device_quantity, data.quantity_total);

          deviceRef.child('quantity_available').set(newValue);

          this.deleteRequest(request.key);
      });


  }

  getUserRequests(userKey): any{
      let reff = this.db.list<RequestEntry>("requests", ref => ref.orderByChild('user_id').equalTo(userKey));

      return reff.snapshotChanges();
  }

  getRequests(): any{
      let reff = this.db.list<RequestEntry>("requests");

      return reff.snapshotChanges();
  }

// -- REQUESTS END --




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
