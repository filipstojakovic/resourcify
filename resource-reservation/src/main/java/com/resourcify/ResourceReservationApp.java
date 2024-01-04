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
