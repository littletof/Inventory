import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info-dialog.component.html',
  styleUrls: ['./device-info-dialog.component.css']
})
export class DeviceInfoDialogComponent implements OnInit {

  displayTags: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceInfoDialogComponent>) {

    this.displayTags = [];
    for(let propName in data.tags){
        this.displayTags.push(propName);
    }

  }

  ngOnInit() {
  }

  closeDialog(ret = null){
    this.dialogRef.close(ret);
  }

}
