import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import {User} from "../user";
import { AuthService} from "../backend-services/auth.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {DatabaseService} from "../backend-services/database.service";

@Injectable()
export class FirebaseAuthService implements AuthService {
  static logged_in_user: User;
  id=0;

  constructor(public afAuth: AngularFireAuth, public DB: DatabaseService) { }

  isLoggedIn(): boolean {
    return this.afAuth.auth.currentUser != null;
  }

    check(){
        console.log(this.id);
        this.id++;
    }

  loginWithEmail(email, password, onLogin, onError) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        onLogin(value);
      })
      .catch(reason => {
        onError(reason);
      });
  }

  logOut(): void {
    this.afAuth.auth.signOut();
  }



  registerUser(email: string, password: string, user: User): Promise<Observable<firebase.User | null>> { //

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((authState: Observable<firebase.User | null>) => {

        const uid = this.afAuth.auth.currentUser.uid;

        this.DB.addUserWithKey(user/*new User(this.name, this.email, this.role)*/, uid);

        return authState;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
