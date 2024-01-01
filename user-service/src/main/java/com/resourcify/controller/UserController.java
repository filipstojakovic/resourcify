package com.resourcify.controller;

import com.resourcify.common.model.User;
import com.resourcify.service.UserService;
import lombok.RequiredArgsConstructor;
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

  private final UserService userService;

  @GetMapping("users")
  public ResponseEntity<List<User>> users() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("users/{id}")
  public ResponseEntity<User> userById(@PathVariable String id) {
    List<User> users = userService.getUserById(id);
    if (users.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found");
    }

    return ResponseEntity.ok(users.get(0));
  }
}
