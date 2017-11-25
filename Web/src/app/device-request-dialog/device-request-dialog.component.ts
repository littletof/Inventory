import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-device-request-dialog',
  templateUrl: './device-request-dialog.component.html',
  styleUrls: ['./device-request-dialog.component.css']
})
export class DeviceRequestDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceRequestDialogComponent>, public db: DatabaseService) {

    if(data){

    }else {

    }


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
