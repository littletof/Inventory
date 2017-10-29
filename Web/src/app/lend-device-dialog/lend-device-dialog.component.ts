import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-lend-device-dialog',
  templateUrl: './lend-device-dialog.component.html',
  styleUrls: ['./lend-device-dialog.component.css']
})
export class LendDeviceDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDeviceDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(ret){
      this.dialogRef.close(ret);
  }

}
