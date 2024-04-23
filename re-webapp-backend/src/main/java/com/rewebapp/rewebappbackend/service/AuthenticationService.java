package com.rewebapp.rewebappbackend.service;

import com.rewebapp.rewebappbackend.data.AuthenticationResponse;
import com.rewebapp.rewebappbackend.data.TokenRequest;
import com.rewebapp.rewebappbackend.entity.Role;
import com.rewebapp.rewebappbackend.entity.User;
import com.rewebapp.rewebappbackend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
// business logic behind login and register
public class AuthenticationService
{
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthenticationResponse register(User request) {
        // check if username exists
        if(userRepo.existsByUsername(request.getUsername())){
            return new AuthenticationResponse(null, "USERNAME_EXISTS");
        }

        // check if email exists
        if(userRepo.existsByEmail(request.getEmail())){
            return new AuthenticationResponse(null, "EMAIL_EXISTS");
        }

        // check if password is valid
        String passwdError = isValidPassword(request.getPassword(), request.getPasswordRepeat());
        if(passwdError != null){
            return new AuthenticationResponse(null, passwdError);
        }

        // create user object
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        // save user to database
        try{
            user = userRepo.save(user);
            String token = jwtService.generateToken(user);
            return new AuthenticationResponse(token, null);
        }
        catch(Exception e){
            return new AuthenticationResponse(null, "INTERNAL_ERROR");
        }
    }

    public AuthenticationResponse authenticate(User request){
        // authenticate user by username and passwd
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        }
        catch(Exception e){
            return new AuthenticationResponse(null, "AUTH_FAIL");
        }
        // get user from database and generate JWToken
        try{
            User user = userRepo.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.generateToken(user);
            return new AuthenticationResponse(token, null);
        }
        catch(Exception e){
            return new AuthenticationResponse(null, "INTERNAL_ERROR");
        }
    }

    public AuthenticationResponse home(TokenRequest request){
        try{
            String username = jwtService.extractUsername(request.getToken());
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if(jwtService.isTokenValid(request.getToken(), userDetails)){
                return new AuthenticationResponse(request.getToken(), null);
            }
        }
        catch(Exception e){
            System.out.println(e.toString());
        }
        return new AuthenticationResponse(null, "INVALID_TOKEN");
    }

    private String isValidPassword(String password, String passwordRepeat){
        if(password.length() < 10){
            return "PASSWD_LEN";
        }
        if(!password.matches(".*[a-z].*")){
            return "PASSWD_LOWER";
        }
        if(!password.matches(".*[A-Z].*")){
            return "PASSWD_UPPER";
        }
        if(!password.matches(".*[0-9].*")){
            return "PASSWD_DIGIT";
        }
        if(!password.matches(".*[^\\w\\s].*")){
            return "PASSWD_PUNC";
        }
        if(!password.equals(passwordRepeat)){
            return "PASSWD_MATCH";
        }
        return null;
    }
}
