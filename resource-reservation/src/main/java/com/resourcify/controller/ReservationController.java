package com.resourcify.controller;

import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ResourceResponse;
import com.resourcify.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("resources")
public class ReservationController {

  private final ReservationService reservationService;

  @PostMapping("reservations")
  public ResponseEntity<ResourceResponse> reserveResource(@Valid @RequestBody ReserveResourceRequest resourceRequest,
                                                          @AuthenticationPrincipal Jwt jwt) {

    ResourceResponse resource = reservationService.reserveResource(resourceRequest, jwt);
    return new ResponseEntity<>(resource, HttpStatus.CREATED);
  }

  @DeleteMapping("{resourceId}/reservations/{reservationId}")
  public ResponseEntity<ResourceResponse> deleteReservation(@PathVariable String resourceId,
                                                @PathVariable String reservationId,
                                                @AuthenticationPrincipal Jwt jwt) {
    //todo: check if admin or himself
    ResourceResponse resource = reservationService.deleteReservation(resourceId, reservationId, jwt);
    return new ResponseEntity<>(resource, HttpStatus.OK);
  }

}
