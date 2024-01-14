package com.resourcify.mapper;

import com.resourcify.common.model.User;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.response.ReservationResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ReservationMapper {

  private final ModelMapper modelMapper;

  public ReservationResponse toReservationResponse(String resourceId, Reservation reservation, List<User> allUsers) {
    ReservationResponse reservationResponse = modelMapper.map(reservation, ReservationResponse.class);
    User userResponse = allUsers.stream().filter(user -> user.getId().equals(reservation.getForUserId())).findFirst()
        .orElse(null);
    reservationResponse.setUser(userResponse);
    reservationResponse.setResourceId(resourceId);
    return reservationResponse;
  }

  public Reservation fromRequest(ReserveResourceRequest request, Jwt jwt) {
    Reservation reservation = modelMapper.map(request, Reservation.class);

    return reservation;
  }
}
