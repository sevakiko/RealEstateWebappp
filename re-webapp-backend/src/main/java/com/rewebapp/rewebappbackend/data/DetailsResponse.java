package com.rewebapp.rewebappbackend.data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DetailsResponse {
    private String address;
    private Double latitude;
    private Double longitude;
    private String username;
    private String email;
}
