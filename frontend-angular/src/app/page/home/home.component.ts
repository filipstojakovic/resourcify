import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private http: HttpClient) {
  }

  onClick() {
    this.http.get("http://localhost:8083/messages", { responseType: 'text' }).subscribe({
          next: (res) => {
            console.log("we are here")
            console.log(res)
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }
}
