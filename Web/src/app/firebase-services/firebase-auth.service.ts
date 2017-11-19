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


  constructor(public afAuth: AngularFireAuth, public db: DatabaseService, public router: Router) {
      this.user = afAuth.authState;

      this.user.subscribe((user)=>{

          if(user){
              localStorage.setItem("user", this.getUserInfoLocal(user));
              if(!user.isAnonymous){
                  this.saveUserData(user.uid);
              }
          }else{
              localStorage.removeItem("user");
              localStorage.removeItem("userData");
          }
      });





  }

  getUserInfoLocal(user): any{
      let userInfo = {isAnonymus: user.isAnonymous, uid: user.uid};

      return JSON.stringify(userInfo);
  }

  saveUserData(uid: string){
      this.db.getUser(uid).valueChanges().forEach(data =>{
          let userData = {uid: uid, emial: data.email_address, name: data.name, role: data.role};


          localStorage.setItem("userData", JSON.stringify(userData));

      });
  }

  getUserData(){
      return JSON.parse(localStorage.getItem("userData"));
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

    isAnonym(): boolean{
        return JSON.parse(localStorage.getItem("user")).isAnonymus;
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
        localStorage.removeItem("userData");
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
