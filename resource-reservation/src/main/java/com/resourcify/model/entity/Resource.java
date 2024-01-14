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
  private Integer amount = 1;
  private String backgroundColor;

  private List<Reservation> reservations = new ArrayList<>();
  @CreatedDate
  private LocalDateTime createdDate;
  @CreatedBy
  private String createdByUser;
  @LastModifiedDate
  private LocalDateTime lastModifiedDate;
  @LastModifiedBy
  private String modifiedByUser;
  public Resource(final String id, final String name, final String description, Integer amount) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
  }
}
