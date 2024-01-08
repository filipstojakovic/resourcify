package com.resourcify.model.response;

import com.resourcify.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

  private String reservationId;
  private User user;
  private String description;
  private LocalDateTime reservationDate;
  private boolean isActive;
}
