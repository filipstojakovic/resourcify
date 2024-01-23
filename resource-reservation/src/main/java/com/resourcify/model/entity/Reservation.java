package com.resourcify.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@Data
public class Reservation {

  private String reservationId = UUID.randomUUID().toString();
  private String forUserId;
  private String createdBy;
  private String description;
  private LocalDateTime reservationDate;
  private boolean isApproved = false;

}
