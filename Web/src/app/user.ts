export class User {

  constructor(
      public name: string,
      public email_address: string,
      public role: string,
      public present_lendings: string[] = [],
      public past_lendings: string[] = []) {}


    static fromDB_Snapshot(snap){
      let js = snap.payload.val();
      return {key: snap.payload.key, ...js};
    }
}
