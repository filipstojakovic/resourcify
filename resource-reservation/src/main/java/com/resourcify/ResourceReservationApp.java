package com.resourcify;

import com.resourcify.model.Reservation;
import com.resourcify.model.Resource;
import com.resourcify.repository.ResourceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableFeignClients
public class ResourceReservationApp {

  public static void main(String[] args) {
    SpringApplication.run(ResourceReservationApp.class, args);
  }

//   @Bean
//   public CommandLineRunner runner(ResourceRepository repo) {
//     return args -> {
//
//       Resource resource = new Resource(null, "laptop", "windows");
//       repo.insert(resource);
//
//       Resource saved = repo.findByName("laptop").orElse(null);
//       Reservation reservation = new Reservation("asd2", LocalDateTime.now(), true);
//       saved.getReservations().add(reservation);
//       repo.save(saved);
//
//       saved = repo.findByName("laptop").orElse(null);
//
//       System.out.println(saved);
//     };
//   }
}
