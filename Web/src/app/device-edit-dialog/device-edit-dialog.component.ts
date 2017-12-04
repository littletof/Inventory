import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from "@angular/material";
import { SPACE} from "@angular/cdk/keycodes";
import {Device} from "../device";
import {DatabaseService} from "../backend-services/database.service";
import {NgForm} from "@angular/forms";

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

    device_image: string;

    default_device_quantity = 1;

    imei: {};


    device_key = null;
    editing = false;



    borrowed_Q: number = 0;


    time: string;

    @ViewChild('imageUpload') imageUpload;
    hasImageToUpload:boolean = false;
    deleteImage:boolean;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeviceEditDialogComponent>, public db: DatabaseService) {
        this.time = new Date().getTime().toString();


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
        this.device_image = device.image;

        this.borrowed_Q = device.quantity_total-device.quantity_available;

        for(let t in device.tags){
            this.tags.push({ name: t.trim() });
        }

        this.imei = device.imei;

    }



    isValid(): boolean{
        if(this.device_quantity>0 && this.device_name.trim() != ""){
            return true;
        }
        return false;
    }

    addDevice(f: NgForm){
        if(f.valid && this.isValid()) {

            let device = this.prepareDevice();

            this.handleImage(device);


            if(this.editing){
                device.quantity_available = device.quantity_total-this.borrowed_Q;

                this.db.updateDevice(this.device_key, device);
            }else {
                this.db.addDevice(device);
            }






            this.closeDialog(device);
        }
    }

    hasFile(event){
        this.hasImageToUpload = event;
    }

    handleImage(device:Device){
        if(this.deleteImage){
           device.image = "";
           return;
        }

        if(this.hasImageToUpload){
            device.image = this.time;

            this.imageUpload.uploadSingle();
        }
    }


    prepareDevice() : Device {
        this.device_tags = {};
        this.tags.forEach(t => {
            this.device_tags[t.name] = true;
        });
        //TODO to be able to add imeis
        return new Device(this.device_name, this.device_quantity, this.device_description, this.device_tags, this.device_image,this.imei);
    }




    static openDialog(dialog, data, callback){
        let cdata ={...data, cb: callback};

        dialog.open(DeviceEditDialogComponent, {
            data: cdata,
            width: '50%'
        });
    }

    closeDialog(ret = null){
        ret && this.data.cb && this.data.cb(ret);
        this.dialogRef.close();
    }



    //ChipList-------

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
