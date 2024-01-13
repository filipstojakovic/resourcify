import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserType} from '../model/UserType';
import {BackendUrl} from "../constants/backendUrl";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<UserType[]>(BackendUrl.USERS);
  }
}

