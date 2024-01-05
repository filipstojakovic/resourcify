import {Injectable} from '@angular/core';
import {EventReservationType} from '../model/calendar/EventReservationType';
import {ResourceType} from '../model/ResourceType';

@Injectable({
  providedIn: 'root',
})
export class ResourceEventMapperService {

  constructor() {
  }

  mapResourceToReservationEvents(resource: ResourceType): EventReservationType[] {
    if (resource.reservations == null)
      return [];

    const reservations = resource.reservations;
    const resourceName = resource.name;

    return reservations.map(reservation => {
      return {
        id: reservation.reservationId,
        title: reservation.user.username + " " + resourceName,
        start: reservation.reservationDate,
        allDay: true,
        backgroundColor: resource.backgroundColor, // || "#FF0000" //default color
        data: reservation,
      }
    });
  }

  mapResourcesToReservationEvents(resources: ResourceType[]): EventReservationType[] {
    const allEvents: EventReservationType[] = [];

    resources.forEach(resource => {
      const events = this.mapResourceToReservationEvents(resource);
      allEvents.push(...events);
    });

    return allEvents;
  }

}
