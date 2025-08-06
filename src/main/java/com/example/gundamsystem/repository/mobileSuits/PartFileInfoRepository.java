package com.example.gundamsystem.repository.mobileSuits;


import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.gundamsystem.entity.mobileSuits.PartFileInfo;

import jakarta.transaction.Transactional;

@Repository
public interface PartFileInfoRepository extends JpaRepository<PartFileInfo, String> {

    // ファイルディレクトリで検索（主キー）
    PartFileInfo findByFileDir(String fileDir);

    // モビルスーツ型番で検索
    List<PartFileInfo> findByMobileSuitNumber(String mobileSuitNumber);

    // モビルスーツ型番 + 部品種別で検索
    List<PartFileInfo> findByMobileSuitNumberAndPartsType(String mobileSuitNumber, String partsType);

    // モビルスーツ型番 + 部品種別 + 部品IDで1件取得
    PartFileInfo findByMobileSuitNumberAndPartsTypeAndPartsId(String mobileSuitNumber, String partsType, String partsId);
    
    @Query("SELECT p.fileDir FROM PartFileInfo p WHERE p.mobileSuitNumber = :mobileSuitNumber AND p.partsType = :partsType AND p.partsId = :partsId")
    String findFileDirByMobileSuitNumberAndPartsTypeAndPartsId(
        @Param("mobileSuitNumber") String mobileSuitNumber,
        @Param("partsType") String partsType,
        @Param("partsId") String partsId
    );
    
    @Modifying
    @Transactional
    @Query("DELETE FROM PartFileInfo p WHERE p.mobileSuitNumber = :mobileSuitNumber AND p.partsType = :partsType AND p.partsId = :partsId")
    int deleteByMobileSuitNumberAndPartsTypeAndPartsId(
        @Param("mobileSuitNumber") String mobileSuitNumber,
        @Param("partsType") String partsType,
        @Param("partsId") String partsId
    );
    
    @Modifying
    @Transactional
    int deleteByMobileSuitNumber(String mobileSuitNumber);
    
    @Query("SELECT p.fileDir FROM PartFileInfo p WHERE p.mobileSuitNumber = :mobileSuitNumber")
    List<String> findFileDirByMobileSuitNumber(
        @Param("mobileSuitNumber") String mobileSuitNumber
    );
}
