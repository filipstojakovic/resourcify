import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./module/material.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./module/app-routing.module";
import {HomeComponent} from './page/home/home.component';
import {ResourceComponent} from './page/resource/resource.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./auth/initKeycloack";
import { HeaderComponent } from './component/header/header.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { CalendarComponent } from './component/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResourceComponent,
    HeaderComponent,
    CalendarComponent,
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
    FullCalendarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
