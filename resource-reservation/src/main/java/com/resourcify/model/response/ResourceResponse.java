package com.resourcify.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceResponse {

  private String id;
  private String name;
  private String description;
  private Integer amount;
  private List<ReservationResponse> reservations;
}
