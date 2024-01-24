package com.resourcify.model.entity;

import com.resourcify.common.model.enums.StatusEnum;
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
  private LocalDateTime fromDate;
  private LocalDateTime toDate;
  private StatusEnum status = StatusEnum.PENDING;

}
