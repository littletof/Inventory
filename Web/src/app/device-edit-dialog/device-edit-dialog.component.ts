import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from "@angular/material";
import { SPACE} from "@angular/cdk/keycodes";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {NgForm} from "@angular/forms";
import {UploadFormComponent} from "../image_upload/upload-form/upload-form.component";

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

    default_device_quantity = 1;

    device_key = null;
    editing = false;

    upload;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceEditDialogComponent>, public db: DatabaseService) {

        if(data){
            this.loadDevice(data);
            this.editing = true;
        }else {
            this.device_quantity = this.default_device_quantity;
        }


    }

    ngOnInit() {
    }

    loadDevice(device){
        this.device_name = device.name;
        this.device_quantity = device.quantity_total;
        this.device_description = device.description;
        //this.tags = device.tags;
        this.device_key = device.key;


        for(let t in device.tags){
            this.tags.push({ name: t.trim() });
        }

    }

    closeDialog(ret = null){
        this.dialogRef.close(ret);
    }

    isValid(): boolean{
        if(this.device_quantity>0 && this.device_name.trim() != ""){
            return true;
        }
        return false;
    }

    addDevice(f: NgForm){
        this.upload.uploadSingle();

        if(f.valid && this.isValid()) {

            let device = this.prepareDevice();


            if(this.editing){
                this.db.updateDevice(this.device_key, device);
            }else {
                this.db.addDevice(device);
            }

            this.closeDialog();
        }
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
