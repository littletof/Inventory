import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info-dialog.component.html',
  styleUrls: ['./device-info-dialog.component.css']
})
export class DeviceInfoDialogComponent implements OnInit {

  displayTags: string[];
  qrCode: any;
  img_src:string ="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceInfoDialogComponent>, public auth: AuthService, public db: DatabaseService) {

    this.displayTags = [];
    for(let propName in data.tags){
        this.displayTags.push(propName);
    }

    this.qrCode = data.key;

    if(data.image && data.image!="placeholder") {
        this.db.getImage(data.image, (val) => { // || "placeholder"
            this.img_src = val;
        });
    }

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
