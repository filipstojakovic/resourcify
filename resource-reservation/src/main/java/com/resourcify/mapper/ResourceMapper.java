package com.resourcify.mapper;

import com.resourcify.common.model.User;
import com.resourcify.model.entity.Resource;
import com.resourcify.common.model.enums.StatusEnum;
import com.resourcify.model.request.ResourceRequest;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.model.response.ResourceResponse;
import com.resourcify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ResourceMapper {

  private final ModelMapper modelMapper;
  private final UserService userService;
  private final ReservationMapper reservationMapper;

  public ResourceResponse toResponse(Resource resource) {
    return this.toResponse(resource, true);
  }

  public ResourceResponse toResponse(Resource resource, boolean isAdmin) {
    ResourceResponse resourceResponse = modelMapper.map(resource, ResourceResponse.class);
    List<User> users = userService.getAllUser();
    List<ReservationResponse> reservationResponses = resource.getReservations().stream().filter(reservation -> {
      if (!isAdmin) {
        return StatusEnum.APPROVED.equals(reservation.getStatus());
      }
      return true;
    }).map(reservation -> reservationMapper.toReservationResponse(resource.getName(), reservation, users)).toList();
    resourceResponse.setReservations(reservationResponses);
    return resourceResponse;
  }

  public ResourceResponse toResponseNoApprovalFilter(String userId, Resource resource) {
    ResourceResponse resourceResponse = modelMapper.map(resource, ResourceResponse.class);
    List<User> users = userService.getAllUser();
    List<ReservationResponse> reservationResponses = resource.getReservations().stream()
        .filter(reservation -> reservation.getForUserId().equals(userId))
        .map(reservation -> reservationMapper.toReservationResponse(resource.getName(), reservation, users)).toList();
    resourceResponse.setReservations(reservationResponses);
    return resourceResponse;
  }

  public Resource fromRequest(ResourceRequest resourceRequest) {
    return modelMapper.map(resourceRequest, Resource.class);
  }

}
