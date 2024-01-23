package com.resourcify.controller;

import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.service.ResourceReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("resources")
public class ReservationController {

  private final ResourceReservationService resourceReservationService;

  @PostMapping("reservations")
  public ResponseEntity<ReservationResponse> reserveResource(@Valid @RequestBody ReserveResourceRequest resourceRequest,
                                                             @AuthenticationPrincipal Jwt jwt) {
    ReservationResponse resource = resourceReservationService.reserveResource(resourceRequest, jwt);
    return new ResponseEntity<>(resource, HttpStatus.CREATED);
  }

  @PreAuthorize("hasRole('client-admin-role')")
  @PutMapping("reservations/{reservationId}")
  public ResponseEntity<ReservationResponse> updateReserveResource(@PathVariable String reservationId,
                                                                   @Valid @RequestBody ReserveResourceRequest resourceRequest) {
    ReservationResponse resource = resourceReservationService.updateReserveResource(reservationId, resourceRequest);
    return new ResponseEntity<>(resource, HttpStatus.CREATED);
  }

  @PreAuthorize("hasRole('client-admin-role')")
  @PatchMapping("{resourceId}/reservations/{reservationId}")
  public ResponseEntity<ReservationResponse> handleResourceReservationApproval(@PathVariable String resourceId,
                                                                               @PathVariable String reservationId) {
    ReservationResponse resourceResponse = resourceReservationService.handleResourceReservationApproval(resourceId, reservationId);
    return ResponseEntity.ok(resourceResponse);
  }

  @DeleteMapping("{resourceId}/reservations/{reservationId}")
  public ResponseEntity<Void> deleteReservation(@PathVariable String resourceId,
                                                @PathVariable String reservationId,
                                                @AuthenticationPrincipal Jwt jwt) {
    resourceReservationService.deleteReservation(resourceId, reservationId, jwt);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
