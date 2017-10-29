import {User} from "../user";
import {Observable} from "rxjs/Observable";
import {Device} from "../device";
import {AngularFireList, AngularFireObject} from "angularfire2/database";

export abstract class DatabaseService {
  abstract addUserWithKey(user: User, key: string);
  abstract removeUser(user);


  abstract getUsers(): any[];
  abstract getUser(key): any;



  abstract getDevices(): any;

  abstract removeDevice(key);
  abstract tryDev(any);



  /**/
  abstract lendDevice(lendData);

  abstract getLending(key);
  abstract getLendingsOfUser(userkey): any;

}
