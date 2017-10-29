import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {MatDialog} from "@angular/material";
import {DeviceInfoComponent} from "../device-info/device-info.component";
import {LendDeviceDialogComponent} from "../lend-device-dialog/lend-device-dialog.component";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices: any[];

  constructor(private db: DatabaseService, private auth: AuthService,public dialog: MatDialog) {}

  ngOnInit() {

      if (this.auth.isLoggedIn()) {
          this.devices = this.db.getDevices();
      }else {
          console.log('Not logged in');
      }

  }



    openDeviceInfoDialog(data) {
        let dialogref = this.dialog.open(DeviceInfoComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(value => {
           // console.log(value);
            if(value!=null)
            this.openLendDeviceDialog(value);
        });
    }

    openLendDeviceDialog(data){
        console.log(data);
        let dialogref = this.dialog.open(LendDeviceDialogComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(value => {
            console.log('Lending returned with: ', value);
        });
    }

  removeDevice(key){
        this.db.removeDevice(key);
  }

}
