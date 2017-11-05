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

    static from(user_id:string, device_id:string, start_date:string, end_date:string, device_quantity:number, comment:string): LendEntry{
        /*this.user_id = user_id;
        this.device_id = device_id;
        this.start_date = new Date(start_date);
        this.end_date = new Date(end_date);
        this.device_quantity = device_quantity;
        this.comment = comment;
        */
        return new LendEntry(user_id, device_id,new Date(start_date),  new Date(end_date), device_quantity, comment);
    }

    static fromJSON(js): LendEntry{
        /*this.user_id = user_id;
        this.device_id = device_id;
        this.start_date = new Date(start_date);
        this.end_date = new Date(end_date);
        this.device_quantity = device_quantity;
        this.comment = comment;
        */
        return new LendEntry(js.user_id, js.device_id,new Date(js.start_date),  new Date(js.end_date), js.device_quantity, js.comment);
    }

    static fromtoJSON(snap){
        let js = snap.payload.val();
        return {key: snap.payload.key, user_id: js.user_id, device_id: js.device_id, start_date: new Date(js.start_date),
            end_date: new Date(js.end_date), device_quantity: js.device_quantity, comment: js.comment};
    }

    getJSON(): any{
        let lendEntry = {
            user_id: this.user_id,
            device_id: this.device_id,
            start_date: this.start_date.getTime(),
            end_date: this.end_date.getTime(),
            device_quantity: this.device_quantity,
            comment: this.comment

        };

        return lendEntry;
    }

}
