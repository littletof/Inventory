import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info-dialog.component.html',
  styleUrls: ['./device-info-dialog.component.css']
})
export class DeviceInfoDialogComponent implements OnInit {

  displayTags: string[];
  qrCode: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceInfoDialogComponent>, public auth: AuthService) {

    this.displayTags = [];
    for(let propName in data.tags){
        this.displayTags.push(propName);
    }

    this.qrCode = data.key;

  }

  ngOnInit() {
  }

  editDevice(device){
    this.dialogRef.close({device: device, edit:true});
  }

  closeDialog(ret = null){
    this.dialogRef.close(ret);
  }

}
