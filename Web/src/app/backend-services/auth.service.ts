import {User} from "../user";

export abstract class AuthService {
  user: any;
  userDetails: any;
  redirectUrl: string;

  abstract loginWithEmail(email: string, password: string, onLogin, onError): void;
  abstract loginAnonym(onLogin): void;
  abstract isLoggedIn(): boolean;
  abstract logOut(onLogout): void;
  abstract registerUser(email: string, password: string, user: User, onRegister, onError);

  abstract check();
}
