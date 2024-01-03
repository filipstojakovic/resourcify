package com.resourcify.repository;

import com.resourcify.model.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResourceRepository extends MongoRepository<Resource,String> {

  Optional<Resource> findByName(String name);
}
