import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent {
  errorMessage = 'Are you lost?';

  constructor(private router: Router) {
  }

  goBackHome() {
    this.router.navigate(['/']);
  }
}
