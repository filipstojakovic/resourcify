package com.resourcify.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

  private String forUserId;
  private LocalDateTime reservationDate;
  private boolean isActive;

  public Reservation(final String forUserId, final LocalDateTime reservationDate, final boolean isActive) {
    this.forUserId = forUserId;
    this.reservationDate = reservationDate;
    this.isActive = isActive;
  }

  @CreatedDate
  private LocalDateTime createdDate;
  @CreatedBy
  private String createdByUser;

  @LastModifiedDate
  private LocalDateTime lastModifiedDate;
  @LastModifiedBy
  private String modifiedByUser;
}
