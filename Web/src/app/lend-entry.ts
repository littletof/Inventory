export class LendEntry {
    user_id: string;
    device_id: string;
    start_date: Date;
    end_date: Date;
    device_quantity: number;
    comment: string;


    constructor(user_id, device_id, start_date: Date, end_date: Date, device_quantity, comment){
        this.user_id = user_id;
        this.device_id = device_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.device_quantity = device_quantity;
        this.comment = comment;
    }

    static fromDB_Snapshot(snap){
        let js = snap.payload.val();
        return {...js, key: snap.payload.key, start_date: new Date(js.start_date), end_date: new Date(js.end_date)};
    }

    static getJSON(from): any{
        let lendEntry = {
            user_id: from.user_id,
            device_id: from.device_id,
            start_date: from.start_date.getTime(),
            end_date: from.end_date.getTime(),
            device_quantity: from.device_quantity,
            comment: from.comment

        };

        return lendEntry;
    }

}
