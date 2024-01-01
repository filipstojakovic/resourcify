package com.resourcify.controller;

import com.resourcify.common.model.User;
import com.resourcify.service.UserService;
import com.resourcify.common.utils.MyUtils;
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
    User users = userService.getUserById("16ec4929-5c03-4fd6-a120-1a524245b00a"); //TODO: fix me

    var name = (String) principal.getClaims().get("name");
    return name + " ADMIN messages";
  }
}
