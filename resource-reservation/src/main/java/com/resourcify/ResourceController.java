package com.resourcify;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {

  @GetMapping("/messages")
  public String getMessages(@AuthenticationPrincipal Jwt principal) {
    return "USER messages";
  }

  @GetMapping("/messages/admin")
  @PreAuthorize("hasRole('client-admin-role')")
  public String getMessagesAdmin(@AuthenticationPrincipal Jwt principal) {
    return "ADMIN messages";
  }
}
