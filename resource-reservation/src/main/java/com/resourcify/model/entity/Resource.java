package com.resourcify.model.entity;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@Document
public class Resource {

  @Id
  private String id;
  @NotNull
  @Indexed(unique = true)
  private String name;
  private String description;
  private Long amount = 1L;
  private String backgroundColor;

  public Resource(final String name, final String description, final Long amount, final String backgroundColor) {
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.backgroundColor = backgroundColor;
  }

  private List<Reservation> reservations = new ArrayList<>();
  @CreatedDate
  private LocalDateTime createdDate;
  @CreatedBy
  private String createdByUser;
  @LastModifiedDate
  private LocalDateTime lastModifiedDate;
  @LastModifiedBy
  private String modifiedByUser;

}
