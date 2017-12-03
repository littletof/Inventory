import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {MatChipInputEvent, MatDialog, MatPaginator, MatSnackBar} from "@angular/material";
import {DeviceInfoDialogComponent} from "../device-info-dialog/device-info-dialog.component";
import {LendDeviceDialogComponent} from "../lend-device-dialog/lend-device-dialog.component";
import {AngularFireList} from "angularfire2/database";
import {Device} from "../device";
import {DeviceEditDialogComponent} from "../device-edit-dialog/device-edit-dialog.component";
import {SPACE} from "@angular/cdk/keycodes";
import {DeviceRequestDialogComponent} from "../device-request-dialog/device-request-dialog.component";
import {PaginatePipe} from "../paginate.pipe";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  //devices: any[];


  devices: AngularFireList<Device>;

  filter: any[];



  constructor(public db: DatabaseService, public auth: AuthService,public dialog: MatDialog, public snackBar: MatSnackBar) {

      if (this.auth.isLoggedIn()) {

          this.devices = this.db.getDevices().map(changes => {
              return changes.map(c => {
                  return Device.fromJSON(c);
              });
          });
      }else {
          console.log('Not logged in');
      }

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginateOptions: any = PaginatePipe.paginateOptions;
  paginateData: any = {pageIndex: 0, pageSize: this.paginateOptions[1], length: 0};
  onPage(event){
      this.paginateData = event;
      if(this.paginateData.pageIndex*this.paginateData.pageSize > this.paginateData.length){
          this.paginateData.pageIndex = Math.max(Math.floor(this.paginateData.length/this.paginateData.pageSize)-1,0);
      }
  }

  setSearch(tags){
      this.filter = tags;
      this.paginator.previousPage();
      this.paginator.nextPage();
  }

  ngOnInit() { }





  openRequestDeviceDialog(data){
      DeviceRequestDialogComponent.openDialog(this.dialog, data, (reqdata)=>this.onRequest(reqdata));
  }
  onRequest(data){
      this.db.requestDevice(data).then(() => {
          this.openSnack(this.requestString(data));
      });
  }




    openDeviceEditDialog(data = null){
        DeviceEditDialogComponent.openDialog(this.dialog, data, null);
    }


    openDeviceInfoDialog(data) {
        DeviceInfoDialogComponent.openDialog(this.dialog, data, infoData => this.handleInfoReturn(infoData));
    }
    handleInfoReturn(infoData){
        if (infoData.edit) {
            this.openDeviceEditDialog(infoData.device);
        }else if(infoData.lend){
            this.openLendDeviceDialog(infoData.device);
        }else if(infoData.request){
            this.openRequestDeviceDialog(infoData.device);
        }
    }

    openLendDeviceDialog(data){
        LendDeviceDialogComponent.openDialog(this.dialog, data, (lendData)=>this.lendDevice(lendData));
    }
    lendDevice(lendData){
        this.db.lendDevice(lendData, false);
        this.openSnack(this.lendString(lendData));
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


}
