import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../backend-services/auth.service";
import {DatabaseService} from "../backend-services/database.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  devices: any[];

  constructor(private DB: DatabaseService, private auth: AuthService) { }

  ngOnInit() {

      if (this.auth.isLoggedIn()) {
          this.devices = this.DB.getDevices();
      }else {
          console.log('Not logged in');
      }

  }

}
