import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";
import {NgForm} from "@angular/forms";


const defDayDiff = 1;
const defNumOfDevices = 1;

@Component({
  selector: 'app-lend-device-dialog',
  templateUrl: './lend-device-dialog.component.html',
  styleUrls: ['./lend-device-dialog.component.css']
})

export class LendDeviceDialogComponent implements OnInit {
  userID: string;
  deviceID: string;

  startDate: Date;
  endDate: Date;

  minDate: Date;

  numberOfDevices: number = defNumOfDevices;
  comment: string = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDeviceDialogComponent>, public auth: AuthService) {
    this.userID = this.auth.userDetails.uid;
    this.deviceID = this.data.key;


    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate()+defDayDiff);

    this.minDate = new Date(this.startDate);
    this.minDate.setDate(this.minDate.getDate()+1);
  }

  ngOnInit() {
  }

  closeDialog(ret = null){
      if(ret == true) {
          let retVal = {
              user_id: this.userID, device_id: this.deviceID,
              start_date: this.startDate, end_date: this.endDate, device_quantity: this.numberOfDevices, comment: this.comment,

              device_name: this.data.name
          };
          this.dialogRef.close(retVal);
      }else{
          this.dialogRef.close();
      }

  }

    onSubmit(f: NgForm) {
        //console.log(f.value);  // { first: '', last: '' }
        //console.log(f.valid);  // false
        if(f.valid && this.isValid()){
            this.closeDialog(true);
        }
    }

    private isValid(): boolean{
      //console.log(this.endDate.getTime()-this.startDate.getTime());
      if(this.endDate.getTime()-this.startDate.getTime() > 0 && this.numberOfDevices >=1 && this.numberOfDevices <= this.data.quantity_available){
          return true;
      }

      return false;
    }
}
