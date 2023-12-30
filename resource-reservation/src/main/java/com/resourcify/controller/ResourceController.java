package com.resourcify.controller;

import com.resourcify.client.UserClient;
import com.resourcify.model.User;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.resourcify.utils.MyUtils;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ResourceController {

  private final UserClient userClient;
  private static final String BEARER_TOKEN_TYPE = "Bearer";

  @GetMapping("/messages")
  public String getMessages(@AuthenticationPrincipal Jwt principal) {

    List<User> users = userClient.getUsers();
    return "USER messages";
  }

  @GetMapping("/messages/admin")
  @PreAuthorize("hasRole('client-admin-role')")
  public String getMessagesAdmin(@AuthenticationPrincipal Jwt principal) {
    try {
      User users = userClient.getUserById("16ec4929-5c03-4fd6-a120-1a524245b00a");
    } catch (FeignException ex) {
      throw new ResponseStatusException(HttpStatus.valueOf(ex.status()), MyUtils.extractMessageFromResponse(ex.getMessage()));
    }

    return "ADMIN messages";
  }
}
