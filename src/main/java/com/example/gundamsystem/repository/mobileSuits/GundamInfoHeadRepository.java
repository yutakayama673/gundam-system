package com.example.gundamsystem.repository.mobileSuits;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.entity.mobileSuits.PartsId;

import jakarta.transaction.Transactional;

@Repository
public interface GundamInfoHeadRepository extends JpaRepository<GundamInfoHead, PartsId> {
    // モビルスーツ型番ごとの部品名（部位＝Head）を取得（順番付き）
    @Query("SELECT g.partsName FROM GundamInfoHead g WHERE g.mobileSuitNumber = :msNumber ORDER BY g.partsIndex")
    List<String> findPartsByMsNumber(@Param("msNumber") String msNumber);
    
    @Query("SELECT g FROM GundamInfoHead g WHERE g.mobileSuitNumber = :msNumber ORDER BY g.partsIndex")
    List<GundamInfoHead> findByMobileSuitNumberOrderByPartsIndex(@Param("msNumber") String msNumber);
    
    @Query("SELECT g FROM GundamInfoHead g WHERE g.mobileSuitNumber = :msNumber AND g.partsName = :partName ORDER BY g.partsIndex")
    GundamInfoHead findByMobileSuitNumberAndPartsNameOrderByPartsIndex(
        @Param("msNumber") String msNumber,
        @Param("partName") String partName
    );
    
    @Query("SELECT COALESCE(MAX(g.partsIndex), 0) " +
            "FROM GundamInfoHead g " +
            "WHERE g.mobileSuitNumber = :msNumber")
     int findMaxIndex(@Param("msNumber") String msNumber);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM GundamInfoHead h WHERE h.mobileSuitNumber = :msNumber AND h.partsName = :partName")
    int deleteByMobileSuitNumberAndPartsName(@Param("msNumber") String msNumber, @Param("partName") String partName);
    
    @Query("SELECT h.partsId FROM GundamInfoHead h WHERE h.mobileSuitNumber = :msNumber AND h.partsName = :partName")
    String findPartsIdByMobileSuitNumberAndPartsName(@Param("msNumber") String msNumber, @Param("partName") String partName);

    @Modifying
    @Transactional
    int deleteByMobileSuitNumber(String mobileSuitNumber);
}