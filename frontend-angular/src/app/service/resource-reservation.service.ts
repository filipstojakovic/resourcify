import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BackendUrl} from '../constants/backendUrl';
import {ResourceReservationType} from '../model/ResourceReservationType';

@Injectable({
  providedIn: 'root',
})
export class ResourceReservationService {

  constructor(private http: HttpClient) {
  }


  handleResourceReservationApproval(resourceId: string, reservationId: string, isApproved: boolean) {
    return this.http.patch<ResourceReservationType>(`${BackendUrl.RESOURCES}/${resourceId}/${BackendUrl.RESERVATIONS}/${reservationId}`, null)
  }

}
