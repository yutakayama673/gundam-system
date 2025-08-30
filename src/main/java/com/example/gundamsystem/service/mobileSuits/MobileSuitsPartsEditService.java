package com.example.gundamsystem.service.mobileSuits;


import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.dto.mobileSuits.editPartRequest.UpdatedData;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoArms;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoBody;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoLegs;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoWeapon;
import com.example.gundamsystem.entity.mobileSuits.PartsEntity;

@Service
public class MobileSuitsPartsEditService extends MsService{

	/**
	 * 
	 * @param msNumber
	 * @param partType
	 * @param updatedData
	 * @return
	 */
	public ResponseEntity<?> editPart(String msNumber, String partType, UpdatedData updatedData) {

	    switch (partType) {
	        case Constract.HEAD: {
	            Map<String, GundamInfoHead> map = headPartsRepository
	                .findByMobileSuitNumberOrderByPartsIndex(msNumber)
	                .stream()
	                .collect(Collectors.toMap(
	                    head -> head.getPartsName(), // キーに部品名
	                    head -> head                 // 値にエンティティそのまま
	                ));

	            editPartsInfo(
	                updatedData,
	                map,
	                headPartsRepository::save
	            );
	            break;
	        }

	        case Constract.ARMS: {
	            Map<String, GundamInfoArms> map = armsPartsRepository
	                .findByMobileSuitNumberOrderByPartsIndex(msNumber)
	                .stream()
	                .collect(Collectors.toMap(
	                    arms -> arms.getPartsName(),
	                    arms -> arms
	                ));

	            editPartsInfo(
	                updatedData,
	                map,
	                armsPartsRepository::save
	            );
	            break;
	        }

	        case Constract.BODY: {
	            Map<String, GundamInfoBody> map = bodyPartsRepository
	                .findByMobileSuitNumberOrderByPartsIndex(msNumber)
	                .stream()
	                .collect(Collectors.toMap(
	                    body -> body.getPartsName(),
	                    body -> body
	                ));

	            editPartsInfo(
	                updatedData,
	                map,
	                bodyPartsRepository::save
	            );
	            break;
	        }

	        case Constract.LEGS: {
	            Map<String, GundamInfoLegs> map = legsPartsRepository
	                .findByMobileSuitNumberOrderByPartsIndex(msNumber)
	                .stream()
	                .collect(Collectors.toMap(
	                    legs -> legs.getPartsName(),
	                    legs -> legs
	                ));

	            editPartsInfo(
	                updatedData,
	                map,
	                legsPartsRepository::save
	            );
	            break;
	        }

	        case Constract.WEAPON: {
	            Map<String, GundamInfoWeapon> map = weaponPartsRepository
	                .findByMobileSuitNumberOrderByPartsIndex(msNumber)
	                .stream()
	                .collect(Collectors.toMap(
	                    weapon -> weapon.getPartsName(),
	                    weapon -> weapon
	                ));

	            editPartsInfo(
	                updatedData,
	                map,
	                weaponPartsRepository::save
	            );
	            break;
	        }

	        default:
	            return ResponseEntity.badRequest().body("未対応のパーツ種別です: " + msNumber);
	    }

	    return ResponseEntity.ok("更新に成功しました");
	}

	/**
	 * 
	 * @param <T>
	 * @param updatedData
	 * @param existingMap
	 * @param saveFunc
	 */
	private <T extends PartsEntity> void editPartsInfo(
	        UpdatedData updatedData,
	        Map<String, T> existingMap,
	        Consumer<T> saveFunc
	) {
	    // partsName で既存データを取得
	    T entity = existingMap.get(updatedData.getPartName());
	    
	    if (entity == null) {
	        throw new IllegalArgumentException(
	            "指定された部品名は存在しません: " + updatedData.getPartName()
	        );
	    }

	    // データ更新
	    entity.setPartsDiscription(updatedData.getDescription());
	    entity.setPartsFunction(updatedData.getFunction());

	    // materials をカンマ区切り文字列に変換
	    if (updatedData.getMaterials() != null) {
	        entity.setMetalKbn(String.join(",", updatedData.getMaterials()));
	    } else {
	        entity.setMetalKbn(null);
	    }

	    // 保存
	    saveFunc.accept(entity);
	}


	
}
