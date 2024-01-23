import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackendUrl} from '../constants/backendUrl';
import {ResourceReservationType} from '../model/ResourceReservationType';
import {ResourceReservationRequest} from '../model/request/ResourceReservationRequest';

@Injectable({
  providedIn: 'root',
})
export class ResourceReservationService {

  constructor(private http: HttpClient) {
  }

  createResourceReservationReq(resourceReservationReq: ResourceReservationRequest) {
    return this.http.post<ResourceReservationType>(`${BackendUrl.RESOURCES}/${BackendUrl.RESERVATIONS}`, resourceReservationReq);
  }

  handleResourceReservationApproval(resourceId: string, reservationId: string) {
    return this.http.patch<ResourceReservationType>(`${BackendUrl.RESOURCES}/${resourceId}/${BackendUrl.RESERVATIONS}/${reservationId}`, null)
  }

}
