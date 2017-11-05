import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info-dialog.component.html',
  styleUrls: ['./device-info-dialog.component.css']
})
export class DeviceInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceInfoDialogComponent>) {}

  ngOnInit() {
  }

  closeDialog(ret = null){
    this.dialogRef.close(ret);
  }

}
