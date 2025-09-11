package com.example.gundamsystem.service.mobileSuits.partsInsertStrategy;

import java.util.List;

import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest;
import com.example.gundamsystem.entity.mobileSuits.PartsEntity;

public interface PartServiceStrategy<T extends PartsEntity> {
	
	List<T> findByMobileSuitNumber(String msNumber);
	
	T findByMsNumberAndPartName(String msNumber, String partName);
	
	int findMaxIndex(String msNumber);
	
	boolean existsByMsNumberAndPartsName(String msNumber, String partName);
	
	//データを登録する
    void save(String msNumber, SaveMobileSuitPartsRequest.PartInfo info);

}