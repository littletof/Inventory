import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";

@Component({
  selector: 'app-lend-detail-dialog',
  templateUrl: './lend-detail-dialog.component.html',
  styleUrls: ['./lend-detail-dialog.component.css']
})
export class LendDetailDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDetailDialogComponent>, public auth: AuthService) { }

  ngOnInit() {
  }


    static openDialog(dialog, data, callback){
        let cdata ={...data, cb: callback};

        dialog.open(LendDetailDialogComponent, {
            data: cdata,
            width: '50%'
        });
    }

    closeDialog(ret = null){
        ret && this.data.cb && this.data.cb(ret);
        this.dialogRef.close();
    }

}
