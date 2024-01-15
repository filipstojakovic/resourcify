package com.resourcify.service;

import com.resourcify.common.exception.NotFoundException;
import com.resourcify.mapper.ReservationMapper;
import com.resourcify.mapper.ResourceMapper;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.model.response.ResourceResponse;
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
  private final ResourceMapper resourceMapper;
  private final ReservationMapper reservationMapper;

  public ResourceResponse reserveResource(ReserveResourceRequest reserveResourceReq, Jwt jwt) {
    Resource resource = resourceRepository.findById(reserveResourceReq.getResourceId())
        .orElseThrow(() -> new NotFoundException(Resource.class, reserveResourceReq.getResourceId()));
    userService.getUserById(reserveResourceReq.getForUserId()); // check if user exist

    // TODO: check if 12h period
    Reservation reservation = reservationMapper.fromRequest(reserveResourceReq, jwt);
    resource.getReservations().add(reservation);
    resource = resourceRepository.save(resource);

    return resourceMapper.toResponse(resource);
  }

  public ReservationResponse handleResourceReservationApproval(String resourceId, String reservationId) {
    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));
    // TODO: check if in future/past
    Reservation reservation = resource.getReservations().stream()
        .filter(res -> res.getReservationId().equals(reservationId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

    reservation.setApproved(!reservation.isApproved());
    resource = resourceRepository.save(resource);
    // TODO: notify service

    return reservationMapper.toReservationResponse(resource.getName(),reservation);
  }

  public void deleteReservation(final String resourceId, final String reservationId, Jwt jwt) {
    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));

    Reservation reservation = resource.getReservations().stream()
        .filter(res -> res.getReservationId().equals(reservationId))
        .findFirst()
        .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

    resourceRepository.deleteById(resourceId);
  }

}