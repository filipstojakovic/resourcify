package com.resourcify.common.model;

import com.resourcify.common.model.enums.StatusEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage {

  @NotNull
  @NotEmpty
  private String forUsername;
  @NotNull
  @NotEmpty
  private String message;

  private StatusEnum status;
}
