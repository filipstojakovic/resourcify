import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceType} from '../model/ResourceType';
import {BackendUrl} from '../constants/backendUrl';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<ResourceType[]>(BackendUrl.RESOURCES_RESERVATION);
  }

  findById(userId: string) {
    return this.http.get<ResourceType>(`${BackendUrl.RESOURCES_RESERVATION}/${userId}`);
  }

  postResource(resource: ResourceType) {
    return this.http.post<ResourceType>(`${BackendUrl.RESOURCES_RESERVATION}`, resource);
  }
}
