import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent implements OnInit {

  result = "";

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
          next: (res) => {
            console.log("user.service.ts > next(): " + JSON.stringify(res, null, 2));
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

  onClick() {
    this.http.get("/messages", { responseType: 'text' }).subscribe({
          next: (res) => {
            console.log("we are here")
            this.result = res;
            console.log(res)
          },
          error: (err) => {
            console.error(err.message);
          },
        },
    )
  }

}
