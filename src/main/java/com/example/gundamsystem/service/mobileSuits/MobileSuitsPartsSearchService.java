package com.example.gundamsystem.service.mobileSuits;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoArms;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoBody;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoLegs;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoWeapon;
import com.example.gundamsystem.model.mobileSuits.PartDetailResponseInfo;

@Service
public class MobileSuitsPartsSearchService extends MsService{

	/**
	 * 
	 * @param msNumber
	 * @param partType
	 * @param partName
	 * @return
	 */
	public PartDetailResponseInfo getPartDetail(String msNumber, String partType, String partName) {

	    PartDetailResponseInfo result = new PartDetailResponseInfo();
	    String partsId = null;

	    switch (partType) {
	        case Constract.HEAD -> {
	            GundamInfoHead info = headPartsRepository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
	            partsId = setPartDetail(info, result);
	        }
	        case Constract.ARMS -> {
	            GundamInfoArms info = armsPartsRepository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
	            partsId = setPartDetail(info, result);
	        }
	        case Constract.BODY -> {
	            GundamInfoBody info = bodyPartsRepository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
	            partsId = setPartDetail(info, result);
	        }
	        case Constract.LEGS -> {
	            GundamInfoLegs info = legsPartsRepository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
	            partsId = setPartDetail(info, result);
	        }
	        case Constract.WEAPON -> {
	            GundamInfoWeapon info = weaponPartsRepository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
	            partsId = setPartDetail(info, result);
	        }
	        default -> throw new IllegalArgumentException("不正な部品タイプ: " + partType);
	    }

	    // 画像URLの取得
	    result.setImageUrl(
	        partFileInfoRepo.findFileDirByMobileSuitNumberAndPartsTypeAndPartsId(msNumber, partType, partsId)
	    );

	    return result;
	}

	/**
	 * 
	 * @param <T>
	 * @param entity
	 * @param result
	 * @return
	 */
	private <T> String setPartDetail(T entity, PartDetailResponseInfo result) {
	    if (entity == null) return null;

	    if (entity instanceof GundamInfoHead head) {
	        result.setFunction(head.getPartsFunction());
	        result.setDescription(head.getPartsDiscription());
	        result.setMaterials(head.getMetalKbn());
	        return head.getPartsId();
	    } else if (entity instanceof GundamInfoArms arms) {
	        result.setFunction(arms.getPartsFunction());
	        result.setDescription(arms.getPartsDiscription());
	        result.setMaterials(arms.getMetalKbn());
	        return arms.getPartsId();
	    } else if (entity instanceof GundamInfoBody body) {
	        result.setFunction(body.getPartsFunction());
	        result.setDescription(body.getPartsDiscription());
	        result.setMaterials(body.getMetalKbn());
	        return body.getPartsId();
	    } else if (entity instanceof GundamInfoLegs legs) {
	        result.setFunction(legs.getPartsFunction());
	        result.setDescription(legs.getPartsDiscription());
	        result.setMaterials(legs.getMetalKbn());
	        return legs.getPartsId();
	    } else if (entity instanceof GundamInfoWeapon weapon) {
	        result.setFunction(weapon.getPartsFunction());
	        result.setDescription(weapon.getPartsDiscription());
	        result.setMaterials(weapon.getMetalKbn());
	        return weapon.getPartsId();
	    }

	    return null;
	}



}
