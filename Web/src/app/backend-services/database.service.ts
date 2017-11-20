import {User} from "../user";
import {Observable} from "rxjs/Observable";
import {Device} from "../device";
import {AngularFireList, AngularFireObject} from "angularfire2/database";

export abstract class DatabaseService {
  access_db;

  abstract addUserWithKey(user: User, key: string, callback);
  abstract removeUser(user);


  abstract getUsers(): any;

  abstract getUser(key): any;



  abstract getDevices(): any;
  abstract getDevicesWithTag(tag): any;

  abstract getDevice(key): any;

  abstract addDevice(device):any;
  abstract updateDevice(uid, device): any;

  abstract removeDevice(key);
  abstract tryDev(any);



  /**/
  abstract lendDevice(lendData);
  abstract returnLendDevice(lendData);

  abstract getLending(key);
  abstract getLendingsOfUser(userkey): any;

    abstract getImage(img, callback):string;

}
