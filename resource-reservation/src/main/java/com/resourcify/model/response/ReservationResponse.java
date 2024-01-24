package com.resourcify.model.response;

import com.resourcify.common.model.User;
import com.resourcify.common.model.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

  private String reservationId;
  private String resourceName;
  private User user;
  private String description;
  private LocalDateTime fromDate;
  private LocalDateTime toDate;
  private StatusEnum status;
}
