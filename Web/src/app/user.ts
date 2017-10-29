export class User {

  constructor(
      public name: string,
      public email_address: string,
      public role: number,
      public present_lendings: string[] = [],
      public past_lendings: string[] = []) {}



    static fromJsonList(array): User[] {
        return array.map(User.fromJson);
    }

//add more parameters depending on your database entries and Hero constructor
    static fromJson({name, email_address, role, pres_lend, past_lend}): User {
        return new User(name, email_address, role, pres_lend, past_lend);
    }
}
