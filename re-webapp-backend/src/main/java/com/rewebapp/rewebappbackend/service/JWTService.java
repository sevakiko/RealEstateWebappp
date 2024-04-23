package com.rewebapp.rewebappbackend.service;

import com.rewebapp.rewebappbackend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
// service responsible for handling JWToken operations
public class JWTService {

    // returns the signature that we will sign our token with
    private SecretKey getSignature(){
        String key = "95e9663636e4149d263edea6ab070603b3bb7eedd216121d17c029be9d00239e";
        byte[] keyBytes = Decoders.BASE64URL.decode(key);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // generates a new JWToken based on user information
    public String generateToken(User user){
        return Jwts
                .builder()
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) /* valid for one day */
                .signWith(getSignature())
                .compact();
    }

    // extracts the claims (data) of a JWToken if the signature is valid
    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSignature())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // generic method that helps extract a claim from a JWToken
    public <T> T extractClaim(String token, Function<Claims, T> resolver){
        return resolver.apply(extractAllClaims(token));
    }

    // extracts subject from JWToken
    public String extractUsername(String token){ return extractClaim(token, Claims::getSubject); }

    // extracts expiration date from JWToken
    private Date extractExpiration(String token){ return extractClaim(token, Claims::getExpiration); }

    // checks whether the token is expired
    private boolean isTokenExpired(String token){ return extractExpiration(token).before(new Date()); }

    // checks whether the token is valid
    public boolean isTokenValid(String token, UserDetails userDetails){
        return (extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
