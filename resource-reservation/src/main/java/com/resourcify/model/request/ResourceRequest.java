package com.resourcify.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceRequest {

  @NotNull
  @NotEmpty
  private String name;
  private String description;
  @NotNull
  @Positive
  private Integer amount;
  private String backgroundColor;
}
