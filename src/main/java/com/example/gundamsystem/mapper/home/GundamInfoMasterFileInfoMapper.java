package com.example.gundamsystem.mapper.home;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.gundamsystem.model.home.GumdamInfoMasterFileInfo;

@Mapper
public interface GundamInfoMasterFileInfoMapper {
    List<GumdamInfoMasterFileInfo> findByMSNum(@Param("mobileSuitNumber") String mobileSuitNumber);
}
