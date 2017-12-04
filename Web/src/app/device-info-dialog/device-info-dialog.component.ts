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
        this.db.getImage(data.image, (val) => {
            this.img_src = val;
        });
    }

  }

  ngOnInit() {
  }

  editDevice(device){
    this.closeDialog({device: device, edit:true});
  }

  lendDevice(device){
    this.closeDialog({device: device, lend:true});
  }
  requestDevice(device){
      this.closeDialog({device: device, request:true});
  }

  static openDialog(dialog, data, callback){
      let cdata ={...data, cb: callback};

      dialog.open(DeviceInfoDialogComponent, {
          data: cdata,
          width: '50%'
      });
  }

  closeDialog(ret = null){
      ret && this.data.cb && this.data.cb(ret);
      this.dialogRef.close();
  }

}
