export class RequestEntry {

    constructor(public user_uid: string, public device_uid: string, public device_quantity: number, public comment: string, public request_date: Date){}

    toDBJSON(){
        return {...JSON.parse(JSON.stringify(this)), request_date: this.request_date.getTime()};
    }

    static fromDB_Snapshot(snapshot){
        let js = snapshot.payload.val();
        return {...js, key: snapshot.key, request_date: new Date(js.request_date)};
    }
}
