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
import {logging} from "selenium-webdriver";
import getLevel = logging.getLevel;

@Component({
  selector: 'app-user-lendings',
  templateUrl: './user-lendings.component.html',
  styleUrls: ['./user-lendings.component.css']
})
export class UserLendingsComponent implements OnInit {


  lendings: AngularFireList<LendEntry>;

  today: Date;

  constructor(public db: DatabaseService, public auth: AuthService, public dialog: MatDialog) {
    this.today = new Date();




    this.lendings = this.db.getLendingsOfUser(this.auth.userDetails.uid)
        .map(changes => {
            return changes.map(c => {
                let ret = {lend: LendEntry.fromtoJSON(c), device: {}, state: {}};

                //kölcsönzés eszközének keresése
                this.db.getDevice(ret.lend.device_id).subscribe(devices => {
                    ret.device = devices.payload.val();
                });

                ret.state = this.getLendState(this.today, ret.lend.end_date);


                 console.log(ret);
                return ret;
            });
        })
    ;

  }

  openLendDetailDialog(data) {
      let dialogref = this.dialog.open(LendDetailDialogComponent, {
          data,
          width: '50%'
      });
      dialogref.afterClosed().subscribe(value => {
          //console.log('Lending returned with: ', value);
          if (value != null) {

          }
      });
  }

  private getLendState(today, enddate){
      let dif = this.calculateDateDiff(today, enddate);
      if(dif > 1) return 0;
      if(dif <= 1 && dif >=0) return 1;
      return 2;
  }

  private calculateDateDiff(date1, date2): number{

      var timeDiff = date2.getTime() - date1.getTime();
      var diffDays = timeDiff / (1000 * 3600 * 24);

      return diffDays;
  }

  ngOnInit() {
  }

}


