import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';



import { environment } from '../environments/environment'
import { AngularFireModule } from "angularfire2";

import { UsersComponent } from './users/users.component';
import {FirebaseDatabaseService} from "./firebase-services/firebase-database.service";
import { DevicesComponent } from './devices/devices.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule, MatIconModule, MatTableModule, MatListModule, MatInputModule,
    MatCardModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import { MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule} from '@angular/material';

import {AngularFireDatabaseModule} from "angularfire2/database";
import { SignUpComponent } from './sign-up/sign-up.component';
import {AngularFireAuthModule} from "angularfire2/auth";

import { FormsModule } from '@angular/forms';

import {FirebaseAuthService} from "./firebase-services/firebase-auth.service";
import {AuthService} from "./backend-services/auth.service";
import {DatabaseService} from "./backend-services/database.service";
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./backend-services/auth-guard.service";
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { LendDeviceDialogComponent } from './lend-device-dialog/lend-device-dialog.component';

;


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DevicesComponent,
    SignUpComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DeviceInfoComponent,
    LendDeviceDialogComponent
  ],
  entryComponents: [
    DeviceInfoComponent,
      LendDeviceDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    AppRoutingModule,
    FormsModule,
    RouterModule,

    BrowserAnimationsModule,


    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: DatabaseService, useClass: FirebaseDatabaseService},
      { provide: AuthService, useClass: FirebaseAuthService}, AuthGuardService,
      {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
