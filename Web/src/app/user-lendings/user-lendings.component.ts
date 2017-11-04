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
import * as firebase from "firebase";

@Component({
  selector: 'app-user-lendings',
  templateUrl: './user-lendings.component.html',
  styleUrls: ['./user-lendings.component.css']
})
export class UserLendingsComponent implements OnInit {


  lendings: AngularFireList<LendEntry>;

  constructor(public db: DatabaseService, public auth: AuthService, public dialog: MatDialog) {





    this.lendings = this.db.getLendingsOfUser(this.auth.userDetails.uid)
        .map(changes => {
            return changes.map(c => {
                let ret = {lend: LendEntry.fromtoJSON(c), device: {}};

                //kölcsönzés eszközének keresése
                this.db.getDevice(ret.lend.device_id).subscribe(devices => {
                    ret.device = devices.payload.val();
                });

                // console.log(ret);
                return ret;
            });
        })
    ;

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
