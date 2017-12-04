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
    MatCardModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatSnackBarModule,
    MatChipsModule, MatAutocompleteModule, MatTooltipModule, MatStepperModule, MatCheckboxModule, MatPaginatorModule
} from '@angular/material';
import { MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatExpansionModule, MatTabsModule} from '@angular/material';

import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FirebaseAuthService} from "./firebase-services/firebase-auth.service";
import {AuthService} from "./backend-services/auth.service";
import {DatabaseService} from "./backend-services/database.service";
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./backend-services/auth-guard.service";
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DeviceInfoDialogComponent } from './device-info-dialog/device-info-dialog.component';
import { LendDeviceDialogComponent } from './lend-device-dialog/lend-device-dialog.component';
import { UserLendingsComponent } from './lendings/lendings.component';
import { LendDetailDialogComponent } from './lend-detail-dialog/lend-detail-dialog.component';
import { DeviceEditDialogComponent } from './device-edit-dialog/device-edit-dialog.component';
import { DeviceTagsFilterPipe } from './device-tags-filter.pipe';

import { QRCodeModule } from 'angular2-qrcode';
import {AccessGuardService} from "./backend-services/access-guard.service";
import { UploadFormComponent } from './image_upload/upload-form/upload-form.component';
import {UploadService} from "./image_upload/shared/upload.service";
import { LendReturnDialogComponent } from './lend-return-dialog/lend-return-dialog.component';
import { DeviceRequestDialogComponent } from './device-request-dialog/device-request-dialog.component';
import { RequestsComponent } from './requests/requests.component';
import { LendingSearchPipe } from './request-search.pipe';
import { LendOrderPipe } from './state-order.pipe';
import { ChipSearchInputComponent } from './chip-search-input/chip-search-input.component';
import { PaginatePipe } from './paginate.pipe';
import { NameOrderPipe } from './name-order.pipe';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DevicesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DeviceInfoDialogComponent,
    LendDeviceDialogComponent,
    UserLendingsComponent,
    LendDetailDialogComponent,
    DeviceEditDialogComponent,
    DeviceTagsFilterPipe,
    UploadFormComponent,
    LendReturnDialogComponent,
    DeviceRequestDialogComponent,
    RequestsComponent,
    LendingSearchPipe,
    LendOrderPipe,
    ChipSearchInputComponent,
    PaginatePipe,
    NameOrderPipe
  ],
  entryComponents: [
      DeviceInfoDialogComponent,
      DeviceEditDialogComponent,

      LendDeviceDialogComponent,
      LendDetailDialogComponent,
      LendReturnDialogComponent,

      DeviceRequestDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
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
    MatNativeDateModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatCheckboxModule,
    MatPaginatorModule,

    QRCodeModule
  ],
  providers: [{provide: DatabaseService, useClass: FirebaseDatabaseService},
      { provide: AuthService, useClass: FirebaseAuthService}, AuthGuardService, AccessGuardService, UploadService,
      {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}],

  bootstrap: [AppComponent]
})
export class AppModule { }
