package com.rewebapp.rewebappbackend.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListingResponse {
    private Long id;
    private String title;
    private String description;
    private Float price;
    String imageData;
}
