package com.example.gundamsystem.service.mobileSuits;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class DeleteMsService extends MsService{
	
	public ResponseEntity<String> deleteMsInfo (String msNumber){
		
		int count = 0;
		
		count =+ repo.deleteByMobileSuitNumber(msNumber);

		count =+ headPartsRepository.deleteByMobileSuitNumber(msNumber);
		
		count =+ armsPartsRepository.deleteByMobileSuitNumber(msNumber);
		
		count =+ bodyPartsRepository.deleteByMobileSuitNumber(msNumber);
		
		count =+ legsPartsRepository.deleteByMobileSuitNumber(msNumber);
		
		count =+ weaponPartsRepository.deleteByMobileSuitNumber(msNumber);
		
		count =+ partFileInfoRepo.deleteByMobileSuitNumber(msNumber);
		
		String strCount = String.valueOf(count);
		
		return  ResponseEntity.ok("削除完了 :" + strCount +"件");
	}

}
