import {Component, OnInit} from '@angular/core';
import {Paths} from '../../constants/paths';
import {AuthService} from '../../service/auth.service';
import {SocketService} from '../../service/socket.service';
import {ToastService} from 'angular-toastify';
import {NotificationMessage} from '../../model/NotificationMessage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  protected readonly paths = Paths;

  constructor(private authService: AuthService,
              private socketService: SocketService,
              private toastService: ToastService) {
  }

  getLoggedUserName() {
    return this.authService.getFullName();
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().then(res => {
      if (res) {
        this.socketService.connect().subscribe({
              next: (res) => {
                console.log("header.component.ts > next(): " + JSON.stringify(res, null, 2));
                const notificationMessage: NotificationMessage = JSON.parse(res);
                if (notificationMessage.approved) {
                  this.toastService.success(notificationMessage.message);
                } else {
                  this.toastService.error(notificationMessage.message);
                }
              },
              error: (err) => {
                console.error(err.message);
              },
            },
        )
      }
    })
  }
}
