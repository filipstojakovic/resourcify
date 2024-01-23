package com.resourcify.service;

import com.resourcify.common.client.NotificationClient;
import com.resourcify.common.exception.BadRequestException;
import com.resourcify.common.exception.NotFoundException;
import com.resourcify.common.model.NotificationMessage;
import com.resourcify.common.utils.DateTimeUtils;
import com.resourcify.common.utils.JwtUtils;
import com.resourcify.common.utils.LoggingUtil;
import com.resourcify.mapper.ReservationMapper;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ResourceReservationService {

  private final ResourceRepository resourceRepository;
  private final UserService userService;
  private final NotificationClient notificationClient;

  private final ReservationMapper reservationMapper;

  public ReservationResponse reserveResource(ReserveResourceRequest reserveResourceReq, Jwt jwt) {
    JwtUtils.isRequestForUserValid(jwt, reserveResourceReq.getForUserId());
    if (!DateTimeUtils.isAtLeast12HoursFromNow(reserveResourceReq.getReservationDate())) {
      throw new BadRequestException("Time difference has to be at least " + DateTimeUtils.TIME_DIFFERENCE + "h");
    }
    Resource resource = resourceRepository.findById(reserveResourceReq.getResourceId())
        .orElseThrow(() -> new NotFoundException(Resource.class, reserveResourceReq.getResourceId()));

    Long amountUsed = resource.getReservations().stream()
        .filter(reservation -> reservation.getReservationDate().toLocalDate()
            .equals(reserveResourceReq.getReservationDate().toLocalDate()))
        .count();

    if (resource.getAmount() <= amountUsed) {
      throw new BadRequestException("That resource is fully reserved on that date");
    }

    userService.getUserById(reserveResourceReq.getForUserId()); // check if user exist

    Reservation reservation = reservationMapper.fromRequest(reserveResourceReq, jwt);
    resource.getReservations().add(reservation);
    resource = resourceRepository.save(resource);

    return reservationMapper.toReservationResponse(resource.getName(), reservation);
  }

  public ReservationResponse handleResourceReservationApproval(String resourceId, String reservationId) {
    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));
    Reservation reservation = resource.getReservations()
        .stream()
        .filter(res -> res.getReservationId().equals(reservationId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

    reservation.setApproved(!reservation.isApproved());
    resource = resourceRepository.save(resource);
    ReservationResponse reservationResponse = reservationMapper.toReservationResponse(resource.getName(),
        reservation);
    NotificationMessage message = new NotificationMessage(reservationResponse.getUser()
        .getUsername(),
        "Your resource (" + resource.getName() + ") reservation has been " + (reservation.isApproved() ?
            "approved" : "declined"), reservationResponse.isApproved());
    try {
      this.notificationClient.sendNotificationMessage(message);
    } catch (Exception ex) {
      LoggingUtil.logException(ex, NotificationClient.class);
    }

    return reservationResponse;
  }

  public void deleteReservation(final String resourceId, final String reservationId, Jwt jwt) {

    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));

    Reservation reservation = resource.getReservations()
        .stream()
        .filter(res -> res.getReservationId().equals(reservationId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

    JwtUtils.isRequestForUserValid(jwt, reservation.getForUserId());

    resourceRepository.deleteReservationByReservationsReservationId(resourceId, reservationId);
  }

}
