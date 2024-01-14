package com.resourcify.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReserveResourceRequest {

  @NotNull
  @NotEmpty
  private String resourceId;
  @NotNull
  @NotEmpty
  private String forUserId;
  private String description;
  @NotNull
  private LocalDateTime reservationDate;

}
