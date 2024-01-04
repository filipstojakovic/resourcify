package com.resourcify.mapper;

import com.resourcify.common.model.User;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ReservationMapper {

  private final ModelMapper modelMapper;
  private final UserService userService;

  public ReservationResponse toReservationResponse(Reservation reservation, List<User> allUsers) {
    ReservationResponse reservationResponse = modelMapper.map(reservation, ReservationResponse.class);
    User userResponse = allUsers.stream().filter(user -> user.getId().equals(reservation.getForUserId())).findFirst()
        .orElse(null);
    reservationResponse.setUser(userResponse);
    return reservationResponse;
  }
}
