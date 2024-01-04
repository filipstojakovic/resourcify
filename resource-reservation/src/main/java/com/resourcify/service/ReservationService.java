package com.resourcify.service;

import com.resourcify.common.exception.NotFoundException;
import com.resourcify.common.model.User;
import com.resourcify.mapper.ResourceMapper;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ResourceResponse;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ReservationService {

  private final ResourceRepository resourceRepository;
  private final UserService userService;
  private final ResourceMapper resourceMapper;

  public ResourceResponse reserveResource(ReserveResourceRequest resourceRequest, Jwt jwt) {
    Resource resource = resourceRepository.findById(resourceRequest.getResourceId())
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceRequest.getResourceId()));

    User user = userService.getUserById(resourceRequest.getForUserId()); // check if user exist
    // TODO: check if 12h period
    Reservation reservation = new Reservation(user.getId(), resourceRequest.getReservationDate(), jwt);
    resource.getReservations().add(reservation);
    resource = resourceRepository.save(resource);
    return resourceMapper.toResponse(resource);
  }

  public void deleteReservation(final String resourceId, Reservation reservation, Jwt jwt) {
    Resource resource = resourceRepository.findById(resourceId)
        .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));

    // TODO: set isActive false?
    boolean isRemoved = resource.getReservations().remove(reservation);
    if (!isRemoved) {
      throw new NotFoundException(reservation);
    }
    resourceRepository.save(resource);
  }

}
