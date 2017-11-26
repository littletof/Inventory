import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DatabaseService} from "../backend-services/database.service";

@Component({
  selector: 'app-lend-return-dialog',
  templateUrl: './lend-return-dialog.component.html',
  styleUrls: ['./lend-return-dialog.component.css']
})
export class LendReturnDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendReturnDialogComponent>, public db: DatabaseService) {

      if(data){

      }else {

      }


  }



  closeDialog(ret = null){
      this.dialogRef.close(ret);
  }

  ngOnInit() {
  }

}
