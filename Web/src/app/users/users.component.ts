import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseDatabaseService} from "../firebase-services/firebase-database.service"
import {Observable} from "rxjs/Observable";

import {FirebaseAuthService} from "../firebase-services/firebase-auth.service";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";
import {AngularFireList} from "angularfire2/database";
import {User} from "../user";
import {PaginatePipe} from "../paginate.pipe";
import {MatPaginator} from "@angular/material";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: AngularFireList<User>;

  constructor(private db: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {


        this.users = this.db.getUsers().map(changes => {
            return changes.map(c => {
               return User.fromDB_Snapshot(c);
            });
        });

    }else {
      console.log('Not logged in');
    }

  }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    paginateOptions: any = PaginatePipe.paginateOptions;
    paginateData: any = {pageIndex: 0, pageSize: this.paginateOptions[1], length: 0};
    onPage(event){
        this.paginateData = event;
        if(this.paginateData.pageIndex*this.paginateData.pageSize > this.paginateData.length){
            this.paginateData.pageIndex = Math.max(Math.floor(this.paginateData.length/this.paginateData.pageSize)-1,0);
        }
    }
}
