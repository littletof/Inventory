import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DatabaseService} from "../backend-services/database.service";

import 'rxjs/add/operator/take'

@Component({
  selector: 'app-lend-return-dialog',
  templateUrl: './lend-return-dialog.component.html',
  styleUrls: ['./lend-return-dialog.component.css']
})
export class LendReturnDialogComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendReturnDialogComponent>, public db: DatabaseService) {
    this.extractImeis(data);
  }

  extractImeis(data){
      let imeis = data.lend.imei;

      let imeisLend:any[] = [];

      for(let i in imeis){

          let prevComments = [];
          for(let c in data.device.imei[i].comments){
              prevComments.push(data.device.imei[i].comments[c]);
          }

          prevComments = prevComments.reverse();

          imeisLend.push({imei: i, comment: undefined, prev_comments: prevComments});

      }
      data.return = {};
      data.return.imeis = imeisLend;
  }

  static openDialog(dialog, data, callback){
      let cdata ={...data, cb: callback};

      dialog.open(LendReturnDialogComponent, {
          data: cdata,
          width: '50%'
      });
  }

  closeDialog(ret = null){
      ret && this.data.cb && this.data.cb(ret);
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
