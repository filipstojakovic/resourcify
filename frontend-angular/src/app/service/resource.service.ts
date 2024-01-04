import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceType} from '../model/ResourceType';
import {environment} from '../../environments/environment.development';
import {backendUrl} from '../constants/backendUrl';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<ResourceType[]>(`${environment.baseUrl}/${backendUrl.RESOURCES}`);
  }

  findById(id: string) {
    return this.http.get<ResourceType>(`${environment.baseUrl}/${backendUrl.RESOURCES}/${id}`);
  }
}
