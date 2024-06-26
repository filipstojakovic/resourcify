import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackendUrl} from '../constants/backendUrl';
import {ResourceReservationType} from '../model/ResourceReservationType';
import {ResourceReservationRequest} from '../model/request/ResourceReservationRequest';
import {StatusEnum} from "../model/NotificationMessage";
import dateTimeUtil from '../util/dateTimeUtil';

@Injectable({
  providedIn: 'root',
})
export class ResourceReservationService {

  constructor(private http: HttpClient) {
  }

  createResourceReservationReq(resourceReservationReq: ResourceReservationRequest) {
    return this.http.post<ResourceReservationType>(`${BackendUrl.RESOURCES}/${BackendUrl.RESERVATIONS}`, resourceReservationReq);
  }

  updateResourceReservation(reservationId: string, resourceReservationReq: ResourceReservationRequest) {
    return this.http.put(`${BackendUrl.RESOURCES}/${BackendUrl.RESERVATIONS}/${reservationId}`, resourceReservationReq);
  }

  handleResourceReservationApproval(resourceId: string, reservationId: string, status: StatusEnum) {
    return this.http.patch<ResourceReservationType>(`${BackendUrl.RESOURCES}/${resourceId}/${BackendUrl.RESERVATIONS}/${reservationId}`, {status: status})
  }

  deleteUserResourceReservation(resourceId: string, reservationId: string) {
    return this.http.delete(`${BackendUrl.RESOURCES}/${resourceId}/${BackendUrl.RESERVATIONS}/${reservationId}`)
  }
}
