package com.example.gundamsystem.service.mobileSuits;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.entity.home.GumdamInfoMasterEnt;
import com.example.gundamsystem.model.home.GumdamInfoMaster;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MoblieSuitsService extends MsService {
	
	
	/**
	 * 更新処理を行う
	 * @param mobileSuitNumber
	 * @param updatedData
	 * @return
	 */
	public GumdamInfoMasterEnt updateGundamInfo(String mobileSuitNumber, GumdamInfoMasterEnt updatedData) {

	    return repo.findUpdateByMobileSuitNumber(mobileSuitNumber)
	        .map(existing -> {
	            if (updatedData.getMobileSuitName() != null)
	            
	                existing.setMobileSuitName(updatedData.getMobileSuitName());
	                
	            if (updatedData.getPilot() != null)
	            
	                existing.setPilot(updatedData.getPilot());
	                
	            if (updatedData.getStartDesignDate() != null)
	            
	                existing.setStartDesignDate(updatedData.getStartDesignDate());
	                
	            if (updatedData.getEndDesignDate() != null)
	            
	                existing.setEndDesignDate(updatedData.getEndDesignDate());
	                
	            if (updatedData.getMessage() != null)
	            
	                existing.setMessage(updatedData.getMessage());
	                
	            if (updatedData.getBelong() != null)
	            
	                existing.setBelong(updatedData.getBelong());
	                
	            return repo.save(existing);
	        })
	        .orElseThrow(() -> new EntityNotFoundException("指定されたモビルスーツ番号が存在しません: " + mobileSuitNumber));
	
	}
	
	 /**
	  * 検索 モビルスーツマスター情報
	  * @param mobileSuitNumber
	  * @return
	  */
	 public List<GumdamInfoMaster> getGumdamInfoByMsNum(
	        String mobileSuitNumber) {
	    	
	    List<GumdamInfoMaster> result = mapper.findByMsNum(mobileSuitNumber);
	    	 
	    return result;
	 }
	 
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
}