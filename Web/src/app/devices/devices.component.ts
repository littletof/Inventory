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
import {DeviceRequestDialogComponent} from "../device-request-dialog/device-request-dialog.component";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  //devices: any[];

  devices: AngularFireList<Device>;

  filter = [];

  constructor(public db: DatabaseService, public auth: AuthService,public dialog: MatDialog, public snackBar: MatSnackBar) {

      if (this.auth.isLoggedIn()) {

          this.devices = this.db.getDevices().map(changes => {
              return changes.map(c => {
                  return Device.fromJSON(c);
              });
          });

          //console.log(this.devices);
      }else {
          console.log('Not logged in');
      }

  }

  ngOnInit() { }


  requestDevice(data){
      DeviceRequestDialogComponent.open(this.dialog, data, data => this.onRequest(data));
  }

  onRequest(data){
      if(data!=null) {
          this.db.requestDevice(data).then(() => {
              this.openSnack(this.requestString(data));
          });
      }
  }


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
            if(value!=null) {
                if (value.edit) {
                    this.openDeviceEditDialog(value.device);
                }else if(value.lend){
                    this.openLendDeviceDialog(value);
                }else if(value.request){
                    this.requestDevice(data);
                }
            }

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
                this.openSnack(this.lendString(value));
            }
        });
    }

    openSnack(value){
        this.snackBar.open(value , null, {
            duration: 5000
        });
    }

    lendString(value): string{
        return "You successfully borrowed " +value.device_quantity + " x " + value.device_name;
    }
    requestString(value): string{
        return "You successfully requested " +value.device_quantity +  " devices";
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
               // console.log(this.filter);
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
