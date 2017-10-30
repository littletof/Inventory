import { Component, OnInit } from '@angular/core';
import {LendEntry} from "../lend-entry";
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import { MatDialog} from "@angular/material";
import {LendDetailDialogComponent} from "../lend-detail-dialog/lend-detail-dialog.component";
import {Observable} from "rxjs/Observable";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireList, AngularFireObject} from "angularfire2/database";
import {Device} from "../device";

@Component({
  selector: 'app-user-lendings',
  templateUrl: './user-lendings.component.html',
  styleUrls: ['./user-lendings.component.css']
})
export class UserLendingsComponent implements OnInit {


  lendings: AngularFireList<LendEntry>;

  constructor(public db: DatabaseService, public auth: AuthService, public dialog: MatDialog) {



    this.lendings = this.db.getLendingsOfUser(this.auth.userDetails.uid).map(changes => {
        return changes.map(c => {
            //console.log(LendEntry.fromJSON(c.payload.val()).getJSON());
            let device:AngularFireObject<Device> = this.db.getDevice(c.payload.val().device_id).map(chang => {
                return chang.map(myc => {
                    return Device.fromJSON(myc);
                });
            });


            let ret = {lend: LendEntry.fromtoJSON(c), device: {...device}};
            console.log(ret);
            return ret;
        });
    });


    /*

    .map(value => {
        value.forEach(lend => {
            return new LendEntry("", "", new Date(0), new Date(0), 3, "me");
        });
    });

     */

  }

  openLendDetailDialog(data){
      let dialogref = this.dialog.open(LendDetailDialogComponent, {
          data,
          width: '50%'
      });
      dialogref.afterClosed().subscribe(value => {
          //console.log('Lending returned with: ', value);
          if(value != null){

          }
      });
  }

  ngOnInit() {
  }

}
