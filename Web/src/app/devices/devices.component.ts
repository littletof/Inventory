import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {MatDialog} from "@angular/material";
import {DeviceInfoComponent} from "../device-info/device-info.component";

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



    openDialog(data) {
        this.dialog.open(DeviceInfoComponent, {
            data,
            width: '50%',
            height: '500px'
        });
    }

  removeDevice(key){
        this.db.removeDevice(key);
  }

}
