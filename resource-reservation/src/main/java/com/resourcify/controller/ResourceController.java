package com.resourcify.controller;

import com.resourcify.common.model.User;
import com.resourcify.service.UserService;
import com.resourcify.utils.MyUtils;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ResourceController {

  private final UserService userService;

  @GetMapping("/messages")
  public String getMessages(@AuthenticationPrincipal Jwt principal) {

    List<User> users = userService.getAllUser();

    var name = (String) principal.getClaims().get("name");
    return name + " USER messages";
  }

  @GetMapping("/messages/admin")
  @PreAuthorize("hasRole('client-admin-role')")
  public String getMessagesAdmin(@AuthenticationPrincipal Jwt principal) {
    try {
      User users = userService.getUserById("test");
    } catch (FeignException ex) {
      throw new ResponseStatusException(HttpStatus.valueOf(ex.status()), MyUtils.extractMessageFromResponse(ex.getMessage()));
    }

    var name = (String) principal.getClaims().get("name");
    return name + " ADMIN messages";
  }
}
