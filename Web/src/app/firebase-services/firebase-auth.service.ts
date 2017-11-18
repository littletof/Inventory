import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import {User} from "../user";
import { AuthService} from "../backend-services/auth.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {DatabaseService} from "../backend-services/database.service";
import {Router} from "@angular/router";




@Injectable()
export class FirebaseAuthService implements AuthService {


    redirectUrl: string;
    user: Observable<firebase.User>;
    userDetails: firebase.User;
    userData: {};

  constructor(public afAuth: AngularFireAuth, public db: DatabaseService, public router: Router) {
      this.user = afAuth.authState;
      this.user.subscribe((user)=>{
          if(user){
              this.userDetails = user;
              localStorage.setItem("user", user.uid);
              if(user.isAnonymous) {
                  localStorage.setItem("anonym", "true");
              }else{
                  localStorage.removeItem("anonym");
              }
          }else{
              this.userDetails = null;
              localStorage.removeItem("user");
              localStorage.removeItem("anonym")
          }
      });





  }

  getUser(uid: string):any {
      this.db.access_db.database.ref('users/' + uid).transaction(data => {
          console.log(data);
      })
  }

  check(){
      console.log('check');
      //this.afAuth.authState.
      this.afAuth.authState.map(value => {
          console.log(value.getIdToken(true));
      });
  }

    isLoggedIn(): boolean {

        if (localStorage.getItem("user") == null ) {
            return false;
        } else {
            return true;
        }
    }



    loginWithEmail(email, password, onLogin, onError){

      //console.log(this.redirectUrl);

      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((res)=>{
            if(onLogin)onLogin(res);
          })
          .catch((error)=>{
            if(onError){
                onError(error);
            }else{
                throw error;
            }
          });
    }

    loginAnonym(onLogin): void {
        this.afAuth.auth.signInAnonymously()
            .then((res)=>onLogin(res));
    }

    logOut(onLogout){
        localStorage.removeItem("user");
        localStorage.removeItem("anonym");
        this.afAuth.auth.signOut().then((res)=>onLogout(res));
    }

    registerUser(email: string, password: string, user: User, onRegister, onError): Promise<Observable<firebase.User | null>> {

        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((authState: Observable<firebase.User | null>) => {

                const uid = this.afAuth.auth.currentUser.uid;

                this.db.addUserWithKey(user, uid);
                onRegister();
                return authState;
            },
            reason => {
                if(onError){
                    onError(reason);
                }else{
                    console.log(reason);
                }
            })
            .catch((val) => {
                console.log('err', val);
            });
    }
}
