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
    return this.http.get<ResourceType[]>(BackendUrl.RESOURCES);
  }

  findByUserId(userId: string) {
    return this.http.get<ResourceType[]>(`${BackendUrl.RESOURCES}/all/${userId}`);
  }

  findById(resourceId: string) {
    return this.http.get<ResourceType>(`${BackendUrl.RESOURCES}/${resourceId}`);
  }

  postResource(resource: ResourceType) {
    return this.http.post<ResourceType>(`${BackendUrl.RESOURCES}`, resource);
  }

  updateResource(resourceId: string, newResource: ResourceType) {
    return this.http.put<ResourceType>(`${BackendUrl.RESOURCES}/${resourceId}`, newResource);
  }

  deleteResource(resourceId: string) {
    return this.http.delete<ResourceType>(`${BackendUrl.RESOURCES}/${resourceId}`);
  }
}
