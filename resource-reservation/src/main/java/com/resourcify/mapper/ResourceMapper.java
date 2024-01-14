package com.resourcify.mapper;

import com.resourcify.common.model.User;
import com.resourcify.model.entity.Resource;
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
    List<ReservationResponse> reservationResponses = resource.getReservations().stream().filter(reservation1 -> {
      if (!isAdmin) {
        return reservation1.isApproved();
      }
      return true;
    }).map(reservation -> reservationMapper.toReservationResponse(resource.getId(), reservation, users)).toList();
    resourceResponse.setReservations(reservationResponses);
    return resourceResponse;
  }

  public Resource fromRequest(ResourceRequest resourceRequest) {
    return modelMapper.map(resourceRequest, Resource.class);
  }

}
