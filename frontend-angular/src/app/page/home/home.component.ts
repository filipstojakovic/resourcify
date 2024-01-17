import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SocketService} from '../../service/socket.service';
import {ToastService} from "angular-toastify";
import {KeycloakService} from 'keycloak-angular';

import {FormControl, UntypedFormControl} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  @ViewChild('picker', { static: true }) picker: any;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;

  public dateControl = new FormControl(new Date());

  result = "";
  constructor(private http: HttpClient,
              private socketService: SocketService,
              private toastService: ToastService,
              private keycloakService: KeycloakService,
  ) {
  }

  ngOnInit(): void {
    console.log("app.module.ts > environment name: " + environment.ENV_NAME);

  }

  fetchData() {
    this.http.get(`users`).subscribe({
          next: (res) => {
            console.log("home.component.ts > next(): " + JSON.stringify(res, null, 2));
            this.result = JSON.stringify(res);
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

  getJwt() {
    this.keycloakService.getToken().then(res => {
      this.result = res;
    })
  }
}
