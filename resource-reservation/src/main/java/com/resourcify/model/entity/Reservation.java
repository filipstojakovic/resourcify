package com.resourcify.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;

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
  private boolean isActive = true;

  public Reservation(final String forUserId, final LocalDateTime reservationDate, String description, Jwt jwt) {
    this.forUserId = forUserId;
    this.createdBy = jwt.getSubject();
    this.description = description;
    this.reservationDate = reservationDate;
  }

}
