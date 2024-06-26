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
  private Long amount;
  private String backgroundColor;
  private List<ReservationResponse> reservations;
}
