import { Component, OnInit } from '@angular/core';
import {FirebaseDatabaseService} from "../firebase-services/firebase-database.service";
import {FirebaseAuthService} from "../firebase-services/firebase-auth.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [FirebaseDatabaseService, FirebaseAuthService]
})
export class DevicesComponent implements OnInit {
  devices: Observable<any[]>;

  constructor(private fireDB: FirebaseDatabaseService, private afAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.devices = this.fireDB.getDevices();
  }

}
