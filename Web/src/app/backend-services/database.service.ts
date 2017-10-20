import {User} from "../user";
import {Observable} from "rxjs/Observable";
import {Device} from "../device";

export abstract class DatabaseService {
  abstract addUser();
  abstract addUserWithKey(user: User, key: string);
  abstract removeUser(user);
  abstract getUsers(): Observable<any[]>;


  abstract getDevices(): Observable<Device[]>;
}