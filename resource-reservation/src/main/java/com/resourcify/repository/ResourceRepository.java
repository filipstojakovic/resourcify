package com.resourcify.repository;

import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends MongoRepository<Resource, String> {

  Optional<Resource> findByName(String name);
  void deleteReservationByReservationsReservationId(String resourceId, String reservationId);

}
