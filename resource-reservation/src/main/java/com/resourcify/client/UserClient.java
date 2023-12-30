package com.resourcify.client;

import com.resourcify.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "${feign.name}", url = "${feign.url}")
public interface UserClient {

  @GetMapping("users")
  List<User> getUsers();

  @GetMapping("users/{id}")
  User getUserById(@PathVariable String id);

}
