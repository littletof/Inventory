import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {User} from "../user";
import { AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {Router, RouterModule} from "@angular/router";



@Component({
  selector: 'app-signup',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent {
  email: string;
  password: string;
  name: string;
  role: number;
  hide = true;


  constructor(public auth: AuthService, public db: DatabaseService, public router: Router) { }

  
  login() {
    this.auth.loginWithEmail(this.email, this.password, value => {}, error => {});
  }

  logout() {
    this.auth.logOut((res)=>{this.onLogout(this.router)});
  }

  onLogout(router){
      router.navigate(['/']);
  }

  registerUser() {
    this.auth.registerUser(this.email, this.password, new User(this.name, this.email, this.role));
  }

  /*registerUser(): Promise<Observable<firebase.User | null>> {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((authState: Observable<firebase.User | null>) => {

        const uid = this.afAuth.auth.currentUser.uid;
        this.fire.addUserWithKey(new User(this.name, this.email, this.role), uid);

        return authState;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  logout() {
    this.afAuth.auth.signOut();
  }*/
}
