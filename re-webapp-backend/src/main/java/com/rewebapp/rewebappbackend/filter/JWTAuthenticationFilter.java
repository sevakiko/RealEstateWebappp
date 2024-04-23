package com.rewebapp.rewebappbackend.filter;

import com.rewebapp.rewebappbackend.service.JWTService;
import com.rewebapp.rewebappbackend.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// used to filter incoming http requests for JWTokens and automatically authenticate users based on them
// automatically called each time an HTTP request is received

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        // check if request contains  header: "Authorization" that starts with "Bearer "
        // if not pass the request along the filter chain
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        // extract JWToken, skip "Bearer "
        String token = authHeader.substring(7);
        // extract username from JWToken
        String username = jwtService.extractUsername(token);

        // if username != null && there is no authenticated user in the current security context
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            // get user details from database
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            // check whether token is valid or not
            if(jwtService.isTokenValid(token, userDetails)){
                // create authentication token based on user details
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // add additional info to the token based on http request
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // set the authenticated token in the security context (authenticate user)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // pass the request along the filter chain
        filterChain.doFilter(request, response);
    }
}
