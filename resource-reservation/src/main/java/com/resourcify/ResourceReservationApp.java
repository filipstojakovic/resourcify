package com.resourcify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ResourceReservationApp {

    public static void main(String[] args) {
        SpringApplication.run(ResourceReservationApp.class, args);
    }
}
