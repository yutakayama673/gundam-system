package com.example.gundamsystem.service.mobileSuits;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest.PartInfo;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoArms;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoBody;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoLegs;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoWeapon;
import com.example.gundamsystem.model.mobileSuits.MobileSuitPartResponseInfo;
import com.example.gundamsystem.utils.FileEditUtils;

import jakarta.transaction.Transactional;

@Service
public class MoblieSuitsPartsService extends MsService {
	
	 /**
	  * 部品初期表示取得処理
	  * @param muNumber
	  * @return
	  */
	 public ResponseEntity<Map<String, Map<String, List<String>>>> getParts(String msNumber) {
		 
		 if (msNumber == null || msNumber.isEmpty()) {
	            return ResponseEntity.badRequest().build();
	     }
		 
		 Map<String, List<String>> parts = new LinkedHashMap<>();
		 
	     parts.put("Head", headPartsRepository.findPartsByMsNumber(msNumber));
	     parts.put("Arms", armsPartsRepository.findPartsByMsNumber(msNumber));
	     parts.put("Body", bodyPartsRepository.findPartsByMsNumber(msNumber));
	     parts.put("Legs", legsPartsRepository.findPartsByMsNumber(msNumber));
	     parts.put("Weapon", weaponPartsRepository.findPartsByMsNumber(msNumber));
	     
	     Map<String, Map<String, List<String>>> result = new HashMap<>();
	     
	     result.put(msNumber, parts);

	     return ResponseEntity.ok(result);
		       
	 }
	 /**
	  * 部品の詳細情報を取得
	  * @param msNumber
	  * @param partsTypeId
	  * @param parts
	  * @return
	  */
	 public ResponseEntity<List<MobileSuitPartResponseInfo>> getPartInfo(String msNumber, int partsTypeId){
		 
		 
		 List<MobileSuitPartResponseInfo> responseList = new ArrayList<>();
		 
		 
		 switch (partsTypeId) {
	        case Constract.HEAD_NUM:
	            List<GundamInfoHead> headEnt = headPartsRepository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
	            responseList = convertPartsToResponse(
	                headEnt,
	                GundamInfoHead::getPartsName,
	                GundamInfoHead::getPartsFunction,
	                GundamInfoHead::getPartsDiscription,
	                GundamInfoHead::getMetalKbn
	            );
	            break;

	        case Constract.ARMS_NUM:
	            List<GundamInfoArms> armsEnt = armsPartsRepository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
	            responseList = convertPartsToResponse(
	                armsEnt,
	                GundamInfoArms::getPartsName,
	                GundamInfoArms::getPartsFunction,
	                GundamInfoArms::getPartsDiscription,
	                GundamInfoArms::getMetalKbn
	            );
	            break;

	        case Constract.BODY_NUM:
	            List<GundamInfoBody> bodyEnt = bodyPartsRepository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
	            responseList = convertPartsToResponse(
	                bodyEnt,
	                GundamInfoBody::getPartsName,
	                GundamInfoBody::getPartsFunction,
	                GundamInfoBody::getPartsDiscription,
	                GundamInfoBody::getMetalKbn
	            );
	            break;

	        case Constract.LEGS_NUM:
	            List<GundamInfoLegs> legsEnt = legsPartsRepository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
	            responseList = convertPartsToResponse(
	                legsEnt,
	                GundamInfoLegs::getPartsName,
	                GundamInfoLegs::getPartsFunction,
	                GundamInfoLegs::getPartsDiscription,
	                GundamInfoLegs::getMetalKbn
	            );
	            break;

	        case Constract.WEAPON_NUM:
	            List<GundamInfoWeapon> weaponEnt = weaponPartsRepository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
	            responseList = convertPartsToResponse(
	                weaponEnt,
	                GundamInfoWeapon::getPartsName,
	                GundamInfoWeapon::getPartsFunction,
	                GundamInfoWeapon::getPartsDiscription,
	                GundamInfoWeapon::getMetalKbn
	            );
	            break;
	    }
		 
		 if(responseList.isEmpty()) {
			 
			 return ResponseEntity.noContent().build();
		 }
		 
		 return ResponseEntity.ok(responseList);
	 }

	 
	 /**
	  * 各部品登録処理
	  * @param msNumber
	  * @param partTypeId
	  * @param parts
	  * @return
	  */
	 public ResponseEntity<?> registerPartsInfo(String msNumber, int partTypeId, List<PartInfo> parts) {

		 switch (partTypeId) {
		    case Constract.HEAD_NUM: {
		        Map<Integer, GundamInfoHead> map = headPartsRepository
		            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
		            .stream()
		            .collect(Collectors.toMap(GundamInfoHead::getPartsIndex, Function.identity()));

		        upsertPartsInfo(
		            parts,
		            msNumber,
		            map,
		            GundamInfoHead::new,
		            headPartsRepository::save,
		            "head"
		        );
		        break;
		    }

		    case Constract.ARMS_NUM: {
		        Map<Integer, GundamInfoArms> map = armsPartsRepository
		            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
		            .stream()
		            .collect(Collectors.toMap(GundamInfoArms::getPartsIndex, Function.identity()));

		        upsertPartsInfo(
		            parts,
		            msNumber,
		            map,
		            GundamInfoArms::new,
		            armsPartsRepository::save,
		            "arms"
		        );
		        break;
		    }

		    case Constract.BODY_NUM: {
		        Map<Integer, GundamInfoBody> map = bodyPartsRepository
		            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
		            .stream()
		            .collect(Collectors.toMap(GundamInfoBody::getPartsIndex, Function.identity()));

		        upsertPartsInfo(
		            parts,
		            msNumber,
		            map,
		            GundamInfoBody::new,
		            bodyPartsRepository::save,
		            "body"
		        );
		        break;
		    }

		    case Constract.LEGS_NUM: {
		        Map<Integer, GundamInfoLegs> map = legsPartsRepository
		            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
		            .stream()
		            .collect(Collectors.toMap(GundamInfoLegs::getPartsIndex, Function.identity()));

		        upsertPartsInfo(
		            parts,
		            msNumber,
		            map,
		            GundamInfoLegs::new,
		            legsPartsRepository::save,
		            "legs"
		        );
		        break;
		    }

		    case Constract.WEAPON_NUM: {
		        Map<Integer, GundamInfoWeapon> map = weaponPartsRepository
		            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
		            .stream()
		            .collect(Collectors.toMap(GundamInfoWeapon::getPartsIndex, Function.identity()));

		        upsertPartsInfo(
		            parts,
		            msNumber,
		            map,
		            GundamInfoWeapon::new,
		            weaponPartsRepository::save,
		            "weapon"
		        );
		        break;
		    }

		    default:
		        return ResponseEntity.badRequest().body("未対応のパーツ種別です: " + partTypeId);
		}
		 
		 return ResponseEntity.ok("部品編集完了");
	 }
	 /**
	  * 部品データ削除
	  * @param msNumber
	  * @param partTypeId
	  * @param partName
	  * @return
	  */
	 @Transactional
	 public ResponseEntity<?> deletePart(String msNumber, int partTypeId, String partName) {
		    
		    String partsId = null;
		    int deletedCount = 0;

		    switch (partTypeId) {
		        case Constract.HEAD_NUM:
		        	
		        	partsId = headPartsRepository.findPartsIdByMobileSuitNumberAndPartsName(msNumber, partName);
		            deletedCount = headPartsRepository.deleteByMobileSuitNumberAndPartsName(msNumber, partName);
		            break;

		        case Constract.ARMS_NUM:
		        	
		        	partsId = armsPartsRepository.findPartsIdByMobileSuitNumberAndPartsName(msNumber, partName);
		            deletedCount = armsPartsRepository.deleteByMobileSuitNumberAndPartsName(msNumber, partName);
		            break;

		        case Constract.BODY_NUM:
		        	
		        	partsId = bodyPartsRepository.findPartsIdByMobileSuitNumberAndPartsName(msNumber, partName);
		            deletedCount = bodyPartsRepository.deleteByMobileSuitNumberAndPartsName(msNumber, partName);
		            break;

		        case Constract.LEGS_NUM:
		        	
		        	partsId = legsPartsRepository.findPartsIdByMobileSuitNumberAndPartsName(msNumber, partName);
		            deletedCount = legsPartsRepository.deleteByMobileSuitNumberAndPartsName(msNumber, partName);
		            break;

		        case Constract.WEAPON_NUM:
		        	
		        	partsId = weaponPartsRepository.findPartsIdByMobileSuitNumberAndPartsName(msNumber, partName);
		            deletedCount = weaponPartsRepository.deleteByMobileSuitNumberAndPartsName(msNumber, partName);
		            break;

		        default:
		            return ResponseEntity.badRequest().body("無効な部品種別です");
		    }
		    String fileDir = partFileInfoRepo.findFileDirByMobileSuitNumberAndPartsTypeAndPartsId(
		    		msNumber,Constract.CHANGE_PARTS_CTGRY(partTypeId),partsId);
		    
		    //ファイルを消してからDB情報を削除する
		    if(FileEditUtils.deletePartsFile(fileDir)) {
		    	
		    	deletedCount = deletedCount + partFileInfoRepo.deleteByMobileSuitNumberAndPartsTypeAndPartsId(
			    		msNumber,Constract.CHANGE_PARTS_CTGRY(partTypeId),partsId);
		    }

		    if (deletedCount > 1) {
		        return ResponseEntity.ok("削除に成功しました");
		    } else {
		        return ResponseEntity.status(404).body("一致する部品が見つかりませんでした");
		    }
	}

}
