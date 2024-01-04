package com.resourcify.model;

import jakarta.validation.constraints.NotNull;
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
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Resource {

  @Id
  private String id;
  @NotNull
  @Indexed(unique = true)
  private String name;
  private String description;
  private List<Reservation> reservations = new ArrayList<>();

  public Resource(final String id, final String name, final String description) {
    this.id = id;
    this.name = name;
    this.description = description;
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
