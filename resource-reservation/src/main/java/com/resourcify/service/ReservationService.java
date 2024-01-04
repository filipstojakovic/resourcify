package com.resourcify.service;

import com.resourcify.common.exception.NotFoundException;
import com.resourcify.model.Reservation;
import com.resourcify.model.Resource;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationService {

//   private final ReservationRepository reservationRepository;
//   private final ResourceRepository resourceRepository;
//
//   public List<Reservation> getReservationsByDate(LocalDateTime reservationDate) {
//     return reservationRepository.findByReservationDate(reservationDate);
//   }
//
//   public List<Reservation> getReservationsByResourceId(String resourceId) {
//
//     return reservationRepository.findByResourceId(resourceId);
//   }
//
//   public Reservation reserveResource(String resourceId, LocalDateTime reservationDate, String userId) {
//
//     Resource resource = resourceRepository.findById(resourceId).orElseThrow(()->new NotFoundException(Resource.class,resourceId));
//     Reservation reservation = new Reservation();
//     reservation.setReservationDate(reservationDate);
//     reservation.setUserId(userId);
//     return reservationRepository.save(reservation);
//   }
}
