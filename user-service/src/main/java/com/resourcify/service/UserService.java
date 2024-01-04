package com.resourcify.service;

import com.resourcify.common.model.User;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

  public static final String ID_ATTRIBUTE = "id";
  private final Keycloak keycloak;
  private final ModelMapper mapper;
  @Value("${keycloak.realm}")
  private String realm;

  public List<User> getAllUsers() {
    List<UserRepresentation> users = keycloak.realm(realm).users().list();
    return users.stream()
        .map(userRepresentation -> mapper.map(userRepresentation, User.class))
        .toList();
  }

  public List<User> getUserById(String id) {
    List<UserRepresentation> users = keycloak.realm(realm).users().search(ID_ATTRIBUTE + ":" + id, 1, 1);
    if (users.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
    }
    return users.stream()
        .map(userRepresentation -> mapper.map(userRepresentation, User.class))
        .toList();
  }

}
