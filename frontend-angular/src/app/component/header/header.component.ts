import {Component} from '@angular/core';
import {paths} from '../../constants/paths';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  protected readonly paths = paths;

  constructor(private authService: AuthService) {
  }

  getLoggedUserName() {
    return this.authService.getFullName();
  }

  logout() {
    this.authService.logout();
  }
}
