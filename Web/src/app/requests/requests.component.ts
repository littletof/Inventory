import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import {RequestEntry} from "../request-entry";
import {MatDialog} from "@angular/material/dialog";
import {LendDeviceDialogComponent} from "../lend-device-dialog/lend-device-dialog.component";
import {MatPaginator, MatSnackBar} from "@angular/material";
import {PaginatePipe} from "../paginate.pipe";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestSets: any[] = [];
  filter: string[];

  constructor(public db: DatabaseService, public auth: AuthService,public dialog: MatDialog, public snackBar: MatSnackBar) {

//Setup tabbed view
    this.requestSets.push(this.getRequestSet(this.mapIt(this.db.getUserRequests(this.auth.getUserData().uid)), "My requests"));

    if(this.auth.accessFeature(this.auth.admini)){

        this.requestSets.push(this.getRequestSet(this.mapIt(this.db.getRequests()),"All requests"));
    }


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


  lendRequest(request){
      if(this.auth.accessFeature(this.auth.admini)) {
          LendDeviceDialogComponent.openDialog(this.dialog, request, (data) => this.onRequest(data));
      }
  }

  cancelRequest(request, event){
      event.stopPropagation();
      this.db.cancelRequest(request);
      this.openSnack("Request by " + request.user.name +" for "+request.request.device_quantity+" x "+ request.device.name+ " was deleted.")
  }

    openSnack(value){
        this.snackBar.open(value , null, {
            duration: 6000
        });
    }

  onRequest(data){
      this.db.lendDevice(data.retVal, true);
      this.db.deleteRequest(data.input.request.key);

  }



  private getRequestSet(set, title): any{
      return {requests: set, title: title};
  }

  //Requesthez tartozó eszköz és user közös jsonba töltése
  private mapIt(set): any{
      return set.map(changes => {
          return changes.map(c => {
              let ret = {request: RequestEntry.fromDB_Snapshot(c), device: {}, user: {}, state: {}};


              //igénylés eszközének keresése
              this.db.getDevice(ret.request.device_id).subscribe(devices => {
                  ret.device = devices.payload.val();
              });

              this.db.getUser(ret.request.user_id).snapshotChanges().subscribe(users => {
                  ret.user = users.payload.val();
              });

              ret.state = this.getRequestState(new Date(), ret.request.request_date);

              //console.log(ret);
              return ret;
          });
      });
  }

  ngOnInit() {
  }



  private getRequestState(today, enddate){
      let dif = this.calculateDateDiff(today, enddate);


      if(dif< 0.6) return 0;
      if(dif< 0.8) return 1;
      return 2;
  }

  private calculateDateDiff(date1, date2): number{

      var timeDiff = date1.getTime() - date2.getTime();
      var diffDays = timeDiff / (1000 * 3600 * 24);

      return diffDays;
  }

}
