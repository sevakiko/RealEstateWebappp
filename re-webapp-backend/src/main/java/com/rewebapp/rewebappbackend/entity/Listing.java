package com.rewebapp.rewebappbackend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Builder
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long id;

    @ManyToOne
    private User user;

    private String title;

    private String description;

    private String address;

    private Float price;

    private Double latitude;

    private Double longitude;

    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] imageData;
}
