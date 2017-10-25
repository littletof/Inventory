export class User {

  constructor(
      public name: string,
      public email_address: string,
      public role: number) {}


    static fromJsonList(array): User[] {
        return array.map(User.fromJson);
    }

//add more parameters depending on your database entries and Hero constructor
    static fromJson({name, email_address, role}): User {
        return new User(name, email_address, role);
    }
}
