package com.resourcify.common.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

  private String id;
  private String username;
  private String firstName;
  private String lastName;
}
