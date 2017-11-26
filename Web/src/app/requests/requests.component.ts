import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {AuthService} from "../backend-services/auth.service";
import {RequestEntry} from "../request-entry";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestSets: any[] = [];
  filter: string;

  constructor(public db: DatabaseService, public auth: AuthService) {


    this.requestSets.push(this.getRequestSet(this.mapIt(this.db.getUserRequests(this.auth.getUserData().uid)), "My requests"));

    if(this.auth.accessFeature(this.auth.admini)){

        this.requestSets.push(this.getRequestSet(this.mapIt(this.db.getRequests()),"All requests"));
    }


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

      if(dif > 0.5) return 2;
      if(dif <= 0.5 && dif >=0) return 1;
      return 0;
  }

  private calculateDateDiff(date1, date2): number{

      var timeDiff = date2.getTime() - date1.getTime();
      var diffDays = timeDiff / (1000 * 3600 * 24);

      return diffDays;
  }

}