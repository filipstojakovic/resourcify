import {Component, OnInit} from '@angular/core';
import {Paths} from '../../constants/paths';
import {AuthService} from '../../service/auth.service';
import {SocketService} from '../../service/socket.service';
import {ToastService} from 'angular-toastify';
import {NotificationMessage, StatusEnum} from '../../model/NotificationMessage';
import {NotificationEmitterService} from '../../service/notification-emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  protected readonly paths = Paths;

  constructor(private authService: AuthService,
              private socketService: SocketService,
              private toastService: ToastService,
              private notificationEmitterService: NotificationEmitterService,
  ) {
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
                // console.log("header.component.ts > next(): " + JSON.stringify(res, null, 2));
                const notificationMessage: NotificationMessage = JSON.parse(res);
                if (notificationMessage.status === StatusEnum.APPROVED) {
                  this.toastService.success(notificationMessage.message);
                } else if (notificationMessage.status === StatusEnum.DECLINED) {
                  this.toastService.error(notificationMessage.message);
                }
                this.notificationEmitterService.eventEmitter.emit();
              },
              error: (err) => {
                console.error(err.message);
              },
              complete: () => {
                console.log("socket complete")
              },
            },
        )
      }
    })
  }
}
