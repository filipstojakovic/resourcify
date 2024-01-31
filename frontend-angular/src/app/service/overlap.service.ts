import { Injectable } from '@angular/core';
import {ResourceReservationType} from '../model/ResourceReservationType';
import {isAfter, isBefore, max, min} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class OverlapService {

  isResourceAvailable(reservations: ResourceReservationType[], startDate: Date, endDate: Date, amount: number): boolean {
    const overlappingReservations = this.filterOverlappingReservations(reservations, startDate, endDate);

    const map: Map<string, number> = new Map();
    let isAvailable: boolean = true;

    for (const overlappingReservation of overlappingReservations) {
      const reservationStartDate = overlappingReservation.fromDate;
      const reservationEndDate = overlappingReservation.toDate;

      const start = max([reservationStartDate, startDate]);
      const end = min([reservationEndDate, endDate]);

      for (let current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
        const currentDateKey = current.toISOString().split('T')[0];

        map.set(currentDateKey, (map.get(currentDateKey) || 0) + 1);

        if (map.get(currentDateKey) >= amount) {
          isAvailable = false;
          break;
        }
      }

      if (!isAvailable) {
        break;
      }
    }

    return isAvailable;
  }

  filterOverlappingReservations(reservations: ResourceReservationType[], startDate: Date, endDate: Date): ResourceReservationType[] {
    return reservations.filter(reservation => {
      const reservationStartDate = reservation.fromDate;
      const reservationEndDate = reservation.toDate;

      return !(isAfter(reservationStartDate, endDate) || isBefore(reservationEndDate, startDate));
    });
  }

}
