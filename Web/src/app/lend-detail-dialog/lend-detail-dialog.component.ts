import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-lend-detail-dialog',
  templateUrl: './lend-detail-dialog.component.html',
  styleUrls: ['./lend-detail-dialog.component.css']
})
export class LendDetailDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDetailDialogComponent>) { }

  ngOnInit() {
  }


  closeDialog(ret = null){
      this.dialogRef.close();
  }

}
