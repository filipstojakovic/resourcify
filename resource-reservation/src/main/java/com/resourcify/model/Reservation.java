package com.resourcify.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Reservation {
    @Id
    private String id;
    private String userId;
    private Resource resource;
    private LocalDateTime reservationDate;
}
