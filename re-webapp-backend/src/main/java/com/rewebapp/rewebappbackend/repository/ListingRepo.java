package com.rewebapp.rewebappbackend.repository;

import com.rewebapp.rewebappbackend.entity.Listing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingRepo extends JpaRepository<Listing, Long> {

    @Query("SELECT l.id, l.title, l.description, l.price, l.imageData FROM Listing l WHERE l.description LIKE %:query%")
    Page<Object[]> findByQuery(@Param("query") String query, Pageable pageable);

    @Query("SELECT l.id, l.title, l.description, l.price, l.imageData FROM Listing l JOIN l.user u WHERE u.username = :username")
    Page<Object[]> findByUsername(@Param("username") String username, Pageable pageable);

    @Query("SELECT l.address, l.latitude, l.longitude, u.username, u.email FROM Listing l JOIN l.user u WHERE l.id = :id")
    Object[] details(@Param ("id") Long id);
}