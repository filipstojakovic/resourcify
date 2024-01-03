import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserType} from '../model/UserType';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<UserType[]>( environment.baseUrl + "/users");
  }
}

