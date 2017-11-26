import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
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

    closeDialog(ret = null){
        this.dialogRef.close(ret);
    }

    ngOnInit() {
    }

}
