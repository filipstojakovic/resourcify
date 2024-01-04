package com.resourcify.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class Reservation {

  private String forUserId;
  private String createdBy;
  private LocalDateTime reservationDate;
  private boolean isActive = true;

  public Reservation(final String forUserId, final LocalDateTime reservationDate, Jwt jwt) {
    this.forUserId = forUserId;
    this.reservationDate = reservationDate;
    this.createdBy = jwt.getSubject();
  }

}
