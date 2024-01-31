package com.resourcify.service;

import com.resourcify.model.entity.Reservation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class OverlapService {

  public boolean isResourceAvailable(List<Reservation> reservations,
                                     LocalDateTime startDate,
                                     LocalDateTime endDate,
                                     Long amount
  ) {
    List<Reservation> overlappingReservations = filterOverlappingReservations(reservations, startDate, endDate);

    Map<LocalDate, Long> map = new HashMap<>();
    boolean isAvailable = true;
    for (Reservation overlappingReservation : overlappingReservations) {
      LocalDateTime reservationStartDate = overlappingReservation.getFromDate();
      LocalDateTime reservationEndDate = overlappingReservation.getToDate();

      LocalDateTime start = reservationStartDate.isAfter(startDate) ? reservationStartDate : startDate;
      LocalDateTime end = reservationEndDate.isAfter(endDate) ? endDate : reservationEndDate;

      // TODO: check this || condition
      for (; start.isBefore(end) || start.toLocalDate().equals(end.toLocalDate()); start = start.plusDays(1)) {

        map.put(start.toLocalDate(), map.getOrDefault(start.toLocalDate(), 0L) + 1L); // default is (0 + 1)
        if (map.get(start.toLocalDate()) >= amount) {
          log.error("Fully reserved resource on date: {}, amount: {}", start, amount);
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

  private List<Reservation> filterOverlappingReservations(List<Reservation> reservations,
                                                          LocalDateTime startDate,
                                                          LocalDateTime endDate
  ) {
    return reservations.stream().filter(reservation -> {
      LocalDateTime reservationStartDate = reservation.getFromDate();
      LocalDateTime reservationEndDate = reservation.getToDate();
      // Check if the reservation overlaps with the given date range
      return !reservationStartDate.isAfter(endDate) && !reservationEndDate.isBefore(startDate);
    }).toList();
  }
}
