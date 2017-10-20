import {User} from "../user";

export abstract class AuthService {
  user: any;

  abstract loginWithEmail(email: string, password: string, onLogin, onError): void;
  abstract isLoggedIn(): boolean;
  abstract logOut(): void;
  abstract registerUser(email: string, password: string, user: User);
}
