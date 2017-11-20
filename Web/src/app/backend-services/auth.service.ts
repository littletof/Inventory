import {User} from "../user";

export abstract class AuthService {
  user: any;
  redirectUrl: string;


  anyone = ['admin', 'user', 'anonym'];
  authed = ['admin', 'user'];
  admini = ['admin'];

  abstract loginWithEmail(email: string, password: string, onLogin, onError): void;
  abstract loginAnonym(onLogin): void;
  abstract isLoggedIn(): boolean;
  abstract isAnonym(): boolean;
  abstract logOut(onLogout): void;
  abstract registerUser(email: string, password: string, user: User, onRegister, onError);

  abstract check();

  abstract getUserData();
  abstract hasRole(roles):boolean;
  abstract accessFeature(canAccess):boolean;
}
