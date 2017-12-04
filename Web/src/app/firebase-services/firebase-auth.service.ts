import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import {User} from "../user";
import { AuthService} from "../backend-services/auth.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {DatabaseService} from "../backend-services/database.service";




@Injectable()
export class FirebaseAuthService implements AuthService {

    redirectUrl: string;
    user: Observable<firebase.User>;
    usersub: any;


    quests  = ['anonym'];
    anyone = ['admin', 'user', 'anonym'];
    authed = ['admin', 'user'];
    admini = ['admin'];


  constructor(public afAuth: AngularFireAuth, public db: DatabaseService) {
      this.user = afAuth.authState;

      this.usersub = this.user.subscribe((user)=>{

          if(user){
              localStorage.setItem("user", this.getUserInfoLocal(user));
              if(!user.isAnonymous){
                  this.saveUserData(user.uid);
              }
          }else{
              //console.log('remove');
              localStorage.removeItem("user");
              localStorage.removeItem("userData");
          }
      },(err) => {console.log(err);});





  }

  getUserInfoLocal(user): any{
      let userInfo = {isAnonymus: user.isAnonymous, uid: user.uid};

      return JSON.stringify(userInfo);
  }

  saveUserData(uid: string, callback = null){
      this.db.getUser(uid).valueChanges().forEach(data =>{
          let userData = {uid: uid, email: data.email_address, name: data.name, role: data.role};


          localStorage.setItem("userData", JSON.stringify(userData));

          if(callback) callback();
      });
  }

  getUserData(){
      return JSON.parse(localStorage.getItem("userData"));
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

    hasRole(roles: any[]): boolean{
      if(this.getUserData()) {
          return roles.indexOf(this.getUserData().role) != -1;
      }else{
          return false;
      }
    }

    accessFeature(canAccess: any[]):boolean{
      if(!this.isLoggedIn()) return false;

      if(this.isAnonym()) return canAccess.indexOf("anonym") != -1;

      return this.hasRole(canAccess);

    }




    loginWithEmail(email, password, onLogin, onError){

      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((res)=>{


              this.saveUserData(this.afAuth.auth.currentUser.uid, () => {if(onLogin)onLogin(res);});

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
                    this.db.addUserWithKey(user, uid, () => {
                        this.saveUserData(this.afAuth.auth.currentUser.uid, () => {
                        onRegister();
                    });

                });

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
