import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./routing/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./routing/app-routing.module";
import {ResourceComponent} from './page/resource/resource.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./auth/initKeycloak";
import {HeaderComponent} from './component/header/header.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {ResourceDialogComponent} from './component/dialog/resource-dialog/resource-dialog.component';
import {AngularToastifyModule} from 'angular-toastify';
import {KeycloakHttpInterceptorService} from "./auth/keycloak-http-interceptor.service";
import {AdminResourceComponent} from './page/admin-resource/admin-resource.component';
import {ErrorPageComponent} from './page/error-page/error-page.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {ConfirmDialogComponent} from './component/dialog/confirm-dialog/confirm-dialog.component';
import {LoadingComponent} from './component/loading/loading.component';
import {
  AdminResourceReservationComponent,
} from './page/admin-resource-reservation/admin-resource-reservation.component';
import {ResourceReservationDialog} from './component/dialog/resource-reservation-dialog/resource-reservation-dialog';
import {NgxMaterialModule} from './routing/ngx.material.module';
import { UserReservationComponent } from './page/user-reservation/user-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    ResourceComponent,
    HeaderComponent,
    ResourceDialogComponent,
    AdminResourceComponent,
    ErrorPageComponent,
    ConfirmDialogComponent,
    LoadingComponent,
    AdminResourceReservationComponent,
    ResourceReservationDialog,
    UserReservationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    FullCalendarModule,
    AngularToastifyModule,
    ColorPickerModule,
    NgxMaterialModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakHttpInterceptorService,
    multi: true,
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
