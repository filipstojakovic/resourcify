package com.resourcify.model.response;

import com.resourcify.common.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

  private User user;
  private LocalDateTime reservationDate;
  private boolean isActive;
}
