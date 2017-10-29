import { Component, OnInit } from '@angular/core';
import {LendEntry} from "../lend-entry";
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import { MatDialog} from "@angular/material";
import {LendDetailDialogComponent} from "../lend-detail-dialog/lend-detail-dialog.component";
import {Observable} from "rxjs/Observable";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireList} from "angularfire2/database";

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
            return LendEntry.fromtoJSON(c);
        });
    });
    ;

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
