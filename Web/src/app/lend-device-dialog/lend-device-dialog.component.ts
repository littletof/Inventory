import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../backend-services/auth.service";
import {FormControl, NgForm} from "@angular/forms";
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

  borrower: any = {};

    options =[];

    filteredOptions: Observable<any[]>;

    myControl: FormControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LendDeviceDialogComponent>, public auth: AuthService, public db: DatabaseService) {
    this.userID = this.auth.getUserData().uid;//LENDER change to Borrower.uid
    this.deviceID = this.data.key;


    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate()+defDayDiff);

    this.minDate = new Date(this.startDate);
    this.minDate.setDate(this.minDate.getDate()+1);


    this.loadUsers();
  }

  /*

   const sub = this.userCollection.snapshotChanges().map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }).take(1).subscribe((users) => {
      this.users = users
    });
   */




    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .startWith('')
            .map(user => user && typeof user === 'object' ? user.name : user)
            .map(name => name ? this.filter(name) : this.options.slice());
    }


    //NamePicker filter
    filter(name: string): any[] {
        return this.options.filter(option =>
            option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    displayFn(user: any): string {
        return user ? user.name : user;
    }


    loadUsers(){
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

  closeDialog(ret = null){
      if(ret == true) {
          let retVal = {
              user_id: this.userID, device_id: this.deviceID,
              start_date: this.startDate, end_date: this.endDate, device_quantity: this.numberOfDevices, comment: this.comment,

              device_name: this.data.name
          };
          this.dialogRef.close(retVal);
      }else{
          this.dialogRef.close();
      }

  }

    onSubmit(f: NgForm) {
                //console.log(f.value);  // { first: '', last: '' }
                //console.log(f.valid);  // false
               if(f.valid && this.isValid()){
                    this.closeDialog(true);
                }
           }

    private isValid(): boolean{
      //console.log(this.endDate.getTime()-this.startDate.getTime());
      if(this.endDate.getTime()-this.startDate.getTime() > 0 && this.numberOfDevices >=1 && this.numberOfDevices <= this.data.quantity_available){
          //console.log(this.borrower);
          return true;
      }

      return false;
    }
}
