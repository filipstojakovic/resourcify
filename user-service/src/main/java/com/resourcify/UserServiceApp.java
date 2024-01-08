package com.resourcify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// @EnableDiscoveryClient
public class UserServiceApp {

  public static void main(String[] args) {
    SpringApplication.run(UserServiceApp.class, args);
  }
}
