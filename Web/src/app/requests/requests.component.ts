import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import {RequestEntry} from "../request-entry";
import {DeviceRequestInfoDialogComponent} from "../device-request-info-dialog/device-request-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LendDeviceDialogComponent} from "../lend-device-dialog/lend-device-dialog.component";
import {MatPaginator} from "@angular/material";
import {PaginatePipe} from "../paginate.pipe";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestSets: any[] = [];
  filter: string[];

  constructor(public db: DatabaseService, public auth: AuthService,public dialog: MatDialog) {


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

  openDetails(request){
    //DeviceRequestInfoDialogComponent.openDialog(this.dialog, request, null);
  }

  lendRequest(request){
      if(this.auth.accessFeature(this.auth.admini)) {
          LendDeviceDialogComponent.openDialog(this.dialog, request, (data) => this.onRequest(data));
      }
  }

  onRequest(data){
      console.log("req");
      this.db.lendDevice(data.retVal, true);
      this.db.deleteRequest(data.input.request.key);

  }



  private getRequestSet(set, title): any{
      return {requests: set, title: title};
  }

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

     /* if(dif > 0.5) return 2;
      if(dif <= 0.5 && dif >=0) return 1;
      return 0;*/
  }

  private calculateDateDiff(date1, date2): number{

      var timeDiff = date1.getTime() - date2.getTime();
      var diffDays = timeDiff / (1000 * 3600 * 24);

      return diffDays;
  }

}
