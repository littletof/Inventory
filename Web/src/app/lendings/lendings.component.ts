import {Component, OnInit, ViewChild} from '@angular/core';
import {LendEntry} from "../lend-entry";
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import {MatDialog, MatPaginator} from "@angular/material";
import {LendDetailDialogComponent} from "../lend-detail-dialog/lend-detail-dialog.component";
import {LendReturnDialogComponent} from "../lend-return-dialog/lend-return-dialog.component";
import {PaginatePipe} from "../paginate.pipe";




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

  //egy adott kölcsönzéshez tartozó user és device betöltése egy közös jsonba
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


              return ret;
          });
      });
  }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    paginateOptions: any = PaginatePipe.paginateOptions;
    paginateData: any[] = [null,null].map(()=>{return {pageIndex: 0, pageSize: this.paginateOptions[0], length: 0}});
    onPage(event, index){
        this.paginateData[index] = event;
        if(this.paginateData[index].pageIndex*this.paginateData[index].pageSize > this.paginateData[index].length){
            this.paginateData[index].pageIndex = Math.max(Math.floor(this.paginateData[index].length/this.paginateData[index].pageSize)-1,0);
        }
    }

    setSearch(tags){
        this.filter = tags;
        this.paginator.previousPage();
        this.paginator.nextPage();
    }

  openLendDetailDialog(data) {
      LendDetailDialogComponent.openDialog(this.dialog, data, (returnLend) => {
              this.openLendReturnDialog(returnLend);
      });
  }

    openLendReturnDialog(data) {
        LendReturnDialogComponent.openDialog(this.dialog,data, (returnLend)=> {
            this.returnDevice(returnLend);
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


