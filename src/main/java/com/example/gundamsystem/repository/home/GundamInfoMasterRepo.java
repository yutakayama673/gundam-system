package com.example.gundamsystem.repository.home;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.example.gundamsystem.entity.home.GumdamInfoMasterEnt;

import jakarta.transaction.Transactional;

@Repository
public interface GundamInfoMasterRepo extends JpaRepository<GumdamInfoMasterEnt, Long> {
    
	GumdamInfoMasterEnt findBymobileSuitNumber(String mobileSuitNumber);
	
	GumdamInfoMasterEnt findBymobileSuitName(String mobileSuitName);
	
	Optional<GumdamInfoMasterEnt> findUpdateByMobileSuitNumber(String mobileSuitNumber);
	
    @Modifying
    @Transactional
    int deleteByMobileSuitNumber(String mobileSuitNumber);
}
