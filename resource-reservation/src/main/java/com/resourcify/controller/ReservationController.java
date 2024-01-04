package com.resourcify.controller;

import com.resourcify.model.Reservation;
import com.resourcify.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("resources")
public class ReservationController {

//     private final ReservationService reservationService;

//   @GetMapping("{resourceId}") //TODO: maybe change to List<String> resourcesId
//   public ResponseEntity<List<Reservation>> getReservationsByResourceId(@PathVariable String resourceId) {
//     List<Reservation> reservations = reservationService.getReservationsByResourceId(resourceId);
//     return ResponseEntity.ok(reservations);
//   }

//     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date reservationDate,
//     @PostMapping("reservation")
//     public ResponseEntity<Reservation> reserveResource(
//             @RequestParam String resourceId,
//             @RequestParam LocalDateTime reservationDate,
//             @RequestParam String userId) {
//
//         Reservation reservation = reservationService.reserveResource(resourceId, reservationDate, userId);
//         return new ResponseEntity<>(reservation, HttpStatus.CREATED);
//     }

}
