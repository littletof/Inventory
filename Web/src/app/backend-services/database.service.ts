import {User} from "../user";
import {Observable} from "rxjs/Observable";
import {Device} from "../device";
import {AngularFireList, AngularFireObject} from "angularfire2/database";

export abstract class DatabaseService {
  access_db;

  abstract addUserWithKey(user: User, key: string, callback);
  abstract getUsers(): any;
  abstract getUser(key): any;



  abstract getDevices(): any;
  abstract getDevice(key): any;
  abstract addDevice(device):any;
  abstract updateDevice(uid, device): any;



  /**/
  abstract lendDevice(lendData, isRequest);
  abstract returnLendDevice(lendData);

  abstract deleteRequest(requestID);
  abstract cancelRequest(requestData);

  abstract requestDevice(requestData): any;
  abstract getUserRequests(userKey): any;
  abstract getRequests(): any;

  abstract getLendingsOfUser(userkey): any;
  abstract getLendings(): any;

  abstract getImage(img, callback):string;

}
