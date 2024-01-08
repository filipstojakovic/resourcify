package com.resourcify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
// @EnableDiscoveryClient
public class UserServiceApp {

  public static void main(String[] args) {
    SpringApplication.run(UserServiceApp.class, args);
  }
}
