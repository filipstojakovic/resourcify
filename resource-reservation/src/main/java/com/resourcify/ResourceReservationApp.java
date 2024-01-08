package com.resourcify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableFeignClients
@EnableWebSecurity
// @EnableDiscoveryClient
public class ResourceReservationApp {

  public static void main(String[] args) {
    SpringApplication.run(ResourceReservationApp.class, args);
  }
}
