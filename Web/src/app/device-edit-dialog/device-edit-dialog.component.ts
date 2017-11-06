import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from "@angular/material";
import { SPACE} from "@angular/cdk/keycodes";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";

@Component({
  selector: 'app-device-edit-dialog',
  templateUrl: './device-edit-dialog.component.html',
  styleUrls: ['./device-edit-dialog.component.css']
})
export class DeviceEditDialogComponent implements OnInit {
    tags = [];

    device_name: string;
    device_quantity: number;
    device_description: string = "";
    device_tags = {};


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceEditDialogComponent>, public db: DatabaseService) {
    }

    ngOnInit() {
    }

    closeDialog(ret = null){
        this.dialogRef.close(ret);
    }


    addDevice(){
        let device = this.prepareDevice();
        //console.log(device);
        this.db.addDevice(device);

        this.closeDialog();
    }

    prepareDevice() : Device {
        this.device_tags = {};
        this.tags.forEach(t => {
            this.device_tags[t.name] = true;
        });
        return new Device(this.device_name, this.device_quantity, this.device_description, this.device_tags);
    }



    visible: boolean = true;
    selectable: boolean = false;
    removable: boolean = true;
    addOnBlur: boolean = true;

    separatorKeysCodes = [SPACE];


    add(event: MatChipInputEvent): void {
        let input = event.input;
        let value = event.value;

        // Add our tag
        value.split(String.fromCharCode(SPACE)).forEach(val => {
            if ((val || '').trim()) {
                this.tags.push({ name: val.trim() });
            }
        });


        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(fruit: any): void {
        let index = this.tags.indexOf(fruit);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

}
