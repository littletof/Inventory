import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {MatChipInputEvent, MatDialog, MatSnackBar} from "@angular/material";
import {DeviceInfoDialogComponent} from "../device-info-dialog/device-info-dialog.component";
import {LendDeviceDialogComponent} from "../lend-device-dialog/lend-device-dialog.component";
import {AngularFireList} from "angularfire2/database";
import {Device} from "../device";
import {DeviceEditDialogComponent} from "../device-edit-dialog/device-edit-dialog.component";
import {SPACE} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  //devices: any[];

  devices: AngularFireList<Device>;

  filter = [];

  constructor(private db: DatabaseService, private auth: AuthService,public dialog: MatDialog, public snackBar: MatSnackBar) {

      if (this.auth.isLoggedIn()) {

          this.devices = this.db.getDevices().map(changes => {
              return changes.map(c => {
                  return Device.fromJSON(c);
              });
          });

          console.log(this.devices);
      }else {
          console.log('Not logged in');
      }

  }

  ngOnInit() { }


    openDeviceEditDialog(data = null){
        let dialogref = this.dialog.open(DeviceEditDialogComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(value => {

        });
    }


    openDeviceInfoDialog(data) {
        let dialogref = this.dialog.open(DeviceInfoDialogComponent, {
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
        let dialogref = this.dialog.open(LendDeviceDialogComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(value => {
            //console.log('Lending returned with: ', value);
            if(value != null){
                this.db.lendDevice(value);
                this.openSnack(value);
            }
        });
    }

    openSnack(value){
        console.log(value);
        this.snackBar.open("You successfully borrowed " +value.device_number + " x " + value.device_name , null, {
            duration: 5000
        });
    }




    visible: boolean = true;
    selectable: boolean = false;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [SPACE];


    add(event: MatChipInputEvent): void {
        let input = event.input;
        let value = event.value;

        // Add our tag
        value.split(String.fromCharCode(SPACE)).forEach(val => {
            if ((val || '').trim()) {
                this.filter.push(val.trim());
                console.log(this.filter);
            }
        });


        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(tag: any): void {
        let index = this.filter.indexOf(tag);

        if (index >= 0) {
            this.filter.splice(index, 1);
        }
    }

}
