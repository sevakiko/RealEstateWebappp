package com.rewebapp.rewebappbackend.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListingRequest {
    private String username;
    private String title;
    private String description;
    private String address;
    private Float price;
    private Double latitude;
    private Double longitude;
    private String imageData;
}
