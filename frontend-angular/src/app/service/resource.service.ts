import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceType} from '../model/ResourceType';
import {backendUrl} from '../constants/backendUrl';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<ResourceType[]>(backendUrl.RESOURCES_RESERVATION);
  }

  findById(userId: string) {
    return this.http.get<ResourceType>(`${backendUrl.RESOURCES_RESERVATION}/${userId}`);
  }

  postResource(resource: ResourceType) {
    return this.http.post<ResourceType>(`${backendUrl.RESOURCES_RESERVATION}`, resource);
  }
}
