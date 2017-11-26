import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DatabaseService} from "../backend-services/database.service";

@Component({
  selector: 'app-device-request-info-dialog',
  templateUrl: './device-request-info-dialog.component.html',
  styleUrls: ['./device-request-info-dialog.component.css']
})
export class DeviceRequestInfoDialogComponent implements OnInit {


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceRequestInfoDialogComponent>, public db: DatabaseService) {

        if(data){

        }else {

        }


    }

    static open( dialog: MatDialog, data = null, callback){
        let dialogref = dialog.open(DeviceRequestInfoDialogComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(value => {
            callback && callback(value);
        });
    }

    closeDialog(ret = null){
        this.dialogRef.close(ret);
    }

    ngOnInit() {
    }

}
