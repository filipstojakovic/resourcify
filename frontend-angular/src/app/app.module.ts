import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./routing/app-routing.module";
import {HomeComponent} from './page/home/home.component';
import {ResourceComponent} from './page/resource/resource.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./auth/initKeycloak";
import {HeaderComponent} from './component/header/header.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {ResourceDialogComponent} from './component/dialog/resource-dialog/resource-dialog.component';
import {AngularToastifyModule} from 'angular-toastify';
import {KeycloakHttpInterceptorService} from "./auth/keycloak-http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResourceComponent,
    HeaderComponent,
    ResourceDialogComponent,
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
