package com.resourcify.common.client;

import com.resourcify.common.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "${feign.user.name}", url = "${feign.user.url}")
public interface UserClient {

  @GetMapping("users")
  List<User> getAllUsers();

  @GetMapping("users/{id}")
  User getUserById(@PathVariable String id);

}
