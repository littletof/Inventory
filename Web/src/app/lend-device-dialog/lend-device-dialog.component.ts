import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {DatabaseService} from "../backend-services/database.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/startWith';

const defDayDiff = 1;
const defNumOfDevices = 1;

@Component({
  selector: 'app-lend-device-dialog',
  templateUrl: './lend-device-dialog.component.html',
  styleUrls: ['./lend-device-dialog.component.css']
})

export class LendDeviceDialogComponent implements OnInit {
  userID: string;
  deviceID: string;

  startDate: Date;
  endDate: Date;

  minDate: Date;

  numberOfDevices: number = defNumOfDevices;
  comment: string = "";

  borrower: any = null;

    options =[];

    filteredOptions: Observable<any[]>;

    myControl: FormControl = new FormControl();


  amountControl:  FormControl = new FormControl();

  IMEIStoSelectFrom:any[] = [];


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDeviceDialogComponent>,private _formBuilder: FormBuilder, public auth: AuthService, public db: DatabaseService) {
    this.userID = this.auth.getUserData().uid;//LENDER change to Borrower.uid
    this.deviceID = this.data.key;


    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate()+defDayDiff);

    this.minDate = new Date(this.startDate);
    this.minDate.setDate(this.minDate.getDate()+1);

    //console.log(data);

    this.IMEIStoSelectFrom = this.getAvailableIMEIs(this.data.imei);


    this.loadUsers();
  }

    ngOnInit() {

        this.filteredOptions = this.myControl.valueChanges
            .startWith('')
            .map(user => user && typeof user === 'object' ? user.name : user)
            .map(name => name ? this.filterS(name) : this.options.slice());


        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['']
        });

        this.firstFormGroup.setErrors({'not good': true});

        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['']
        });

        this.secondFormGroup.setErrors({init: true});




    }







    step(stepper: MatStepper){
      switch(stepper.selectedIndex){
          case 0:
              this.isFirstValid();
              break;
          case 1:
              this.isSecondValid();
              break;
      }

      stepper.next();
    }

    stepback(stepper: MatStepper){
        stepper.previous();
    }



    //--------------- IMEI stuff

    getAvailableIMEIs(IMEIS: any[]): any[]{

        let goodIMEIs:any[] = [];

        for(let imei in IMEIS){
            if(IMEIS[imei].available){
                goodIMEIs.push({comments: IMEIS[imei].comments, imei: imei, selected: false});
            }
        }
//        console.log(goodIMEIs);


        return goodIMEIs;
    }

    imeiSelectChange(){
        this.isSecondValid();
    }

    getSelectedIMEIs(): any[]{
        let imeis = [];
        for(let imei of this.IMEIStoSelectFrom){
            imei.selected && imeis.push(imei.imei);
        }
        return imeis;
    }





    //----------- NamePicker

    loadUsers(){//loads users that can borrow
        this.db.getUsers().map(users => {
            return users.map(user => {
                return {name: user.payload.val().name, uid: user.key};
            });
        }).first().subscribe(users => {
            this.options = users;
        });
        //import 'rxjs/add/operator/map';
        //import 'rxjs/add/operator/first';
    }

    displayFn(user: any): string {//displaying name in list
        return user ? user.name : user;
    }

    filterS(name: string): any[] {
        return this.options.filter(option =>
            option.name.toLowerCase().indexOf(name.toLowerCase()) != -1);
    }

    equalsF(name: string): any[] {
        return this.options.filter(option =>  name && option.name.toLowerCase() === name.toLowerCase());
    }

    //-------- DIALOG STUFF

    static openDialog(dialog, data, callback){
        let cdata ={...data, cb: callback};

        dialog.open(LendDeviceDialogComponent, {
            data: cdata,
            width: '50%'
        });
    }

    closeDialog(ret = null){
        ret && this.data.cb && this.data.cb(ret);
        this.dialogRef.close();
    }


    onSubmit(f: NgForm) {
        if(f.valid && this.isAllValid()){

            this.userID = this.borrower.uid;

            let imeis = this.castImeiArray(this.getSelectedIMEIs());

            let retVal = {
                user_id: this.userID, device_id: this.deviceID,
                start_date: this.startDate, end_date: this.endDate, device_quantity: this.numberOfDevices, comment: this.comment,

                device_name: this.data.name, imei: imeis
            };




           this.closeDialog(retVal);
        }
    }

    castImeiArray(array):any{
        let imeis = {};
        for(let a in array){
            imeis[array[a]] = true;
        }
        return imeis;
    }

    isBorrowerValid():boolean{
        if(this.borrower && this.borrower.uid){
            return true;
        }else{
            let pos = this.equalsF(this.borrower);
            if(pos.length != 0){
                this.borrower = pos[0];
                return true;
            }else{
                this.myControl.setErrors({noSuchUser: true});
                this.firstFormGroup.setErrors({bad:true});
                return false;
            }
        }
    }

    amountChange(){
        this.isFirstValid();
        this.isSecondValid();
        this.secondFormGroup.setErrors({changed:true});
    }

    isAmountValid(): boolean{
        this.amountControl.markAsTouched();

        if(this.numberOfDevices >=1){
            if(this.numberOfDevices <= this.data.quantity_available){
                return true;
            }else{
                this.amountControl.setErrors({'tooMany': true});
                this.firstFormGroup.setErrors({bad:true});
            }

        }else{
            this.amountControl.setErrors({'tooLow': true});
            this.firstFormGroup.setErrors({bad:true});
        }

        return false;
    }

    private isFirstValid(): boolean{
        this.firstFormGroup.setErrors(null);
        //this.firstFormGroup.setErrors({'not good': false});
        //console.log(this.endDate.getTime()-this.startDate.getTime());
        if(this.endDate.getTime()-this.startDate.getTime() > 0
            && this.isAmountValid()
            && this.isBorrowerValid()){
            return true;
        }
        this.firstFormGroup.setErrors({bad:true});
        return false;
    }

    private isSecondValid(): boolean{
        this.secondFormGroup.setErrors(null);
        if(this.getSelectedIMEIs().length != this.numberOfDevices){
            this.secondFormGroup.setErrors({imeiNumberWrong: true});
            return false;
        }
        return true;
    }

    isAllValid(): boolean{
        return this.isFirstValid()&&this.isSecondValid();
    }



}
