package com.example.gundamsystem.mapper.home;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.gundamsystem.model.home.GumdamInfoMaster;

@Mapper
public interface GundamInfoMasterMapper {
	
    List<GumdamInfoMaster> findByCondition(
        @Param("mobileSuitNumber") String mobileSuitNumber,
        @Param("mobileSuitName") String mobileSuitName,
        @Param("pilot") String pilot
    );
    
    List<GumdamInfoMaster> findByMsNum(
            @Param("mobileSuitNumber") String mobileSuitNumber
        );
}
