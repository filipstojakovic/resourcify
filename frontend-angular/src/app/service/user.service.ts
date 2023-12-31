import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserType} from '../model/UserType';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<UserType[]>("http://localhost:8083" + "/users");
  }
}
