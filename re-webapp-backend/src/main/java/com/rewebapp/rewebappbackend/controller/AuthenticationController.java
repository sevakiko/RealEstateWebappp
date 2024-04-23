package com.rewebapp.rewebappbackend.controller;

import com.rewebapp.rewebappbackend.data.AuthenticationResponse;
import com.rewebapp.rewebappbackend.data.TokenRequest;
import com.rewebapp.rewebappbackend.entity.User;
import com.rewebapp.rewebappbackend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/home")
    public ResponseEntity<AuthenticationResponse> home(@RequestBody TokenRequest request){
        return ResponseEntity.ok(authService.home(request));
    }
}
