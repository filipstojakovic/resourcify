import {Injectable} from '@angular/core';
import {EventReservationType} from '../model/calendar/EventReservationType';
import {ResourceType} from '../model/ResourceType';
import {ResourceReservationType} from '../model/ResourceReservationType';

// import * as Color from 'color';

@Injectable({
  providedIn: 'root',
})
export class ResourceEventMapperService {

  mapResourceToReservationEvents(resource: ResourceType): EventReservationType[] {
    if (resource.reservations == null)
      return [];

    const reservations = resource.reservations;
    return reservations.map(reservation => {
      return this.mapReservationToEventReservation(reservation, resource)
    });
  }

  mapReservationToEventReservation(reservation: ResourceReservationType, resource:ResourceType) {
    // const complementaryColor = resource.backgroundColor ? Color(resource.backgroundColor).negate().hex() : null;
    return {
      id: reservation.reservationId,
      title: reservation.user.username + " (" + resource.name + ")",
      start: reservation.reservationDate,
      allDay: true,
      backgroundColor: resource.backgroundColor, // || "#FF0000" //default color
      // textColor : complementaryColor,
      data: reservation,
    }
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
