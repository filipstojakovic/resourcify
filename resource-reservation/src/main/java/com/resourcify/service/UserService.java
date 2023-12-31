package com.resourcify.service;

import com.resourcify.client.UserClient;
import com.resourcify.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

  private final UserClient userClient;

  public List<User> getAllUser() {
    return userClient.getAllUsers();
  }

  public User getUserById(String id) {
    return userClient.getUserById("16ec4929-5c03-4fd6-a120-1a524245b00a"); //TODO: fix me
  }
}
