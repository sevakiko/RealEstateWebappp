package com.rewebapp.rewebappbackend.service;

import com.rewebapp.rewebappbackend.data.EmailResponse;
import com.rewebapp.rewebappbackend.entity.User;
import com.rewebapp.rewebappbackend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService
{
    private final UserRepo userRepo;

    public EmailResponse getEmail(String username){
        try{
            User user = userRepo.findByUsername(username).orElseThrow();
            return new EmailResponse(user.getEmail());
        }
        catch (Exception e){
            System.out.println(e.toString());
            return new EmailResponse(null);
        }
    }

}
