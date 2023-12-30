package com.resourcify.controller;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserController {

  public static final String ID_ATTRIBUTE = "id";

  private final Keycloak keycloak;

  @Value("${keycloak.realm}")
  private String realm;

  @GetMapping("users")
  public ResponseEntity<List<UserRepresentation>> users() {
    List<UserRepresentation> users = keycloak.realm(realm).users().list();
    return ResponseEntity.ok(users);
  }

  @GetMapping("users/{id}")
  public ResponseEntity<UserRepresentation> userById(@PathVariable String id) {
    List<UserRepresentation> users = keycloak.realm(realm).users().search(ID_ATTRIBUTE + ":" + id, 1, 1);
    if (users.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
    }

    return ResponseEntity.ok(users.get(0));
  }
}
