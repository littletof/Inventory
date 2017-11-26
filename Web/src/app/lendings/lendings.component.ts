import { Component, OnInit } from '@angular/core';
import {LendEntry} from "../lend-entry";
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import { MatDialog} from "@angular/material";
import {LendDetailDialogComponent} from "../lend-detail-dialog/lend-detail-dialog.component";
import {AngularFireList} from "angularfire2/database";
import {LendReturnDialogComponent} from "../lend-return-dialog/lend-return-dialog.component";


@Component({
  selector: 'app-lendings',
  templateUrl: './lendings.component.html',
  styleUrls: ['./lendings.component.css']
})
export class UserLendingsComponent implements OnInit {



  lendingsSet:any[] = [];

  filter: string[];

  today: Date;

  constructor(public db: DatabaseService, public auth: AuthService, public dialog: MatDialog) {
    this.today = new Date();




    this.lendingsSet.push( this.getLendingsSet(this.mapIt(this.db.getLendingsOfUser(this.auth.getUserData().uid)), "My lendings")  );
    if(this.auth.accessFeature(this.auth.admini)){
        this.lendingsSet.push( this.getLendingsSet(this.mapIt(this.db.getLendings()) , "All lendings") );
    }


  }

  getLendingsSet(set, title){
      return {title: title, set: set};
  }

  mapIt(set): any{
      return set.map(changes => {
          return changes.map(c => {
              let ret = {lend: LendEntry.fromDB_Snapshot(c), device: {}, user: {}, state: {}};

              //kölcsönzés eszközének keresése
              this.db.getDevice(ret.lend.device_id).subscribe(devices => {
                  ret.device = devices.payload.val();
              });

              this.db.getUser(ret.lend.user_id).snapshotChanges().subscribe(users => {
                  ret.user = users.payload.val();
              });

              ret.state = this.getLendState(this.today, ret.lend.end_date);


              //console.log(ret);
              return ret;
          });
      });
  }

    setSearch(tags){
      this.filter = tags;
    }

  openLendDetailDialog(data) {
      let dialogref = this.dialog.open(LendDetailDialogComponent, {
          data,
          width: '50%'
      });
      dialogref.afterClosed().subscribe(returnLend => {
          if (returnLend != null) {
                this.openLendReturnDialog(returnLend);
          }
      });
  }

    openLendReturnDialog(data) {
        let dialogref = this.dialog.open(LendReturnDialogComponent, {
            data,
            width: '50%'
        });
        dialogref.afterClosed().subscribe(returnLend => {
            if (returnLend != null) {
                this.returnDevice(returnLend);
            }
        });
    }

  returnDevice(lendData){
      this.db.returnLendDevice(lendData);
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


