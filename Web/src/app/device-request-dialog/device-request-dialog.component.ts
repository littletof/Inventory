import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, NgForm} from "@angular/forms";
import {AuthService} from "../backend-services/auth.service";
import {RequestEntry} from "../request-entry";

@Component({
  selector: 'app-device-request-dialog',
  templateUrl: './device-request-dialog.component.html',
  styleUrls: ['./device-request-dialog.component.css']
})
export class DeviceRequestDialogComponent implements OnInit {



  numberOfDevices: number;
  comment: string;

  tooMany: boolean = false;

    myControl: FormControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceRequestDialogComponent>, public db: DatabaseService, public auth: AuthService) {



    if(data){

    }else {

    }


  }



    onSubmit(f: NgForm) {
        if(this.data.quantity_available < this.numberOfDevices || this.numberOfDevices < 1){
            this.myControl.setErrors({'tooMany': true});
        }


        if(f.valid && this.isValid()){
            this.closeDialog(this.getRequestData());
        }
    }



    getRequestData(){
      let uid = this.auth.getUserData().uid;

      return new RequestEntry(uid, this.data.key, this.numberOfDevices, this.comment, new Date());
    }

    private isValid(): boolean{
        if(this.numberOfDevices >=1){
          if(this.numberOfDevices <= this.data.quantity_available){
              return true;
          }else{

          }

        }else{

        }

        return false;
    }

  static open( dialog: MatDialog, data = null, callback){
      let dialogref = dialog.open(DeviceRequestDialogComponent, {
          data,
          width: '50%'
      });
      dialogref.afterClosed().subscribe(value => {
        callback(value);
      });
  }


  closeDialog(ret = null){
      this.dialogRef.close(ret);
  }

  ngOnInit() {
  }

}
