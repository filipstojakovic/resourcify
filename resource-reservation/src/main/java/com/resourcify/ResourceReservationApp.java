package com.resourcify;

import com.resourcify.model.entity.Resource;
import com.resourcify.repository.ResourceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class ResourceReservationApp {

  public static void main(String[] args) {
    SpringApplication.run(ResourceReservationApp.class, args);
  }

  @Bean
  public CommandLineRunner runner(ResourceRepository repository) {
    return args -> {
      var list = repository.findAll();
      if (list.isEmpty()) {
        var listOfResources = List.of(
            new Resource("Laptop", "MAC book", 12L, "#4cc387"),
            new Resource("Office chair", "Herman Miller", 8L, "#1b59a8")
        );
        repository.saveAll(listOfResources);
      }
    };
  }
}
