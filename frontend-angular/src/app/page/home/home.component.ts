import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SocketService} from '../../service/socket.service';
import {ToastService} from "angular-toastify";
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

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

  sendToRabbit() {
    this.socketService.sendMessage({ message: "test message" });
  }

  getJwt() {
    this.keycloakService.getToken().then(res => {
      this.result = res;
    })
  }
}
