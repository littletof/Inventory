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
    userDetails: firebase.User;

  constructor(public afAuth: AngularFireAuth, public DB: DatabaseService) {
      this.user = afAuth.authState;
      this.user.subscribe((user)=>{
          if(user){
              this.userDetails = user;
              //console.log(this.userDetails);
          }else{
              this.userDetails = null;
          }
      });
  }

    isLoggedIn(): boolean {
        if (this.userDetails == null ) {
            return false;
        } else {
            return true;
        }
    }



    loginWithEmail(email, password, onLogin, onError){

      //console.log(this.redirectUrl);

      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((res)=>onLogin(res));
    }

    loginAnonym(onLogin): void {
        this.afAuth.auth.signInAnonymously()
            .then((res)=>onLogin(res));
    }

    logOut(onLogout){
        this.afAuth.auth.signOut()
            .then((res)=>onLogout(res));
    }

    registerUser(email: string, password: string, user: User, onRegister): Promise<Observable<firebase.User | null>> {

        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((authState: Observable<firebase.User | null>) => {

                const uid = this.afAuth.auth.currentUser.uid;

                this.DB.addUserWithKey(user/*new User(this.name, this.email, this.role)*/, uid);
                onRegister();
                return authState;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
  /*
  isLoggedIn(): boolean {
      if(firebase.auth().currentUser != null) {
          firebase.auth().currentUser.reload()
              .then(value => {
                  console.log("reload", value);
                  return true;
              })
              .catch(val => {
                  console.log("err", val);
                  return false;
              });
          if(firebase.auth().currentUser!=null){
              return true;
          }
      }
      return false;
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

        this.DB.addUserWithKey(user/*new User(this.name, this.email, this.role)//, uid);

        return authState;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  */

  /*loginWithEmail(email, password, onLogin, onError){
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(result => { console.log(result)});

      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(result => {console.log(result);});
  }*/
}
