package com.example.gundamsystem.service.mobileSuits;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest.PartInfo;
import com.example.gundamsystem.entity.mobileSuits.PartFileInfo;
import com.example.gundamsystem.entity.mobileSuits.PartsEntity;
import com.example.gundamsystem.mapper.home.GundamInfoMasterMapper;
import com.example.gundamsystem.model.mobileSuits.MobileSuitPartResponseInfo;
import com.example.gundamsystem.repository.home.GundamInfoMasterRepo;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoArmsRepository;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoBodyRepository;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoHeadRepository;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoLegsRepository;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoWeaponRepository;
import com.example.gundamsystem.repository.mobileSuits.PartFileInfoRepository;
import com.example.gundamsystem.utils.FileEditUtils;

public class MsService {

	@Autowired
	protected GundamInfoMasterRepo repo;
	@Autowired
	protected GundamInfoMasterMapper mapper;
	
    @Autowired 
    protected GundamInfoHeadRepository headPartsRepository;
    @Autowired
    protected GundamInfoArmsRepository armsPartsRepository;
    @Autowired
    protected GundamInfoBodyRepository bodyPartsRepository;
    @Autowired
    protected GundamInfoLegsRepository legsPartsRepository;
    @Autowired
    protected GundamInfoWeaponRepository weaponPartsRepository;
    @Autowired
    protected PartFileInfoRepository partFileInfoRepo;
    
	 /**
	  * 部品の詳細情報を取得共通処理
	  * @param <T>
	  * @param entities
	  * @param getName
	  * @param getFunction
	  * @param getDescription
	  * @return
	  */
	 protected <T> List<MobileSuitPartResponseInfo> convertPartsToResponse(
		        List<T> entities,
		        Function<T, String> getName,
		        Function<T, String> getFunction,
		        Function<T, String> getDescription,
		        Function<T, String> getMetalKbn
		) {
		    return entities.stream()
		        .map(e -> {
		            MobileSuitPartResponseInfo info = new MobileSuitPartResponseInfo();
		            info.setPartsName(getName.apply(e));
		            info.setFunction(getFunction.apply(e));
		            info.setDescription(getDescription.apply(e));
		            info.setMaterials(getMetalKbn.apply(e));
		            return info;
		        })
		        .collect(Collectors.toList());
	}
	 
	 /**
	  * 部品データをインサート、更新を行う
	  * @param <T>
	  * @param inputs
	  * @param msNumber
	  * @param existingMap
	  * @param createEntity
	  * @param saveFunc
	  * @param partsCategory
	  */
	 protected <T extends PartsEntity> void upsertPartsInfo(
			    List<PartInfo> inputs,
			    String msNumber,
			    Map<Integer, T> existingMap,
			    Supplier<T> createEntity,
			    Consumer<T> saveFunc,
			    String partsCategory
		) {
		for (int i = 0; i < inputs.size(); i++) {
			PartInfo input = inputs.get(i);
			int index = i + 1;

			T entity = existingMap.get(index);
			        
			String partsId = String.format("%02d", index);

			if (entity == null) {
				entity = createEntity.get();
				entity.setPartsId(partsId);
				entity.setMobileSuitNumber(msNumber);
				entity.setPartsCategory(partsCategory);
				insertFileDirInfo(msNumber, partsId, partsCategory);
			}

			entity.setPartsIndex(index);
			entity.setPartsName(input.getPartName());
			entity.setPartsFunction(input.getPartsFunction());
			entity.setPartsDiscription(input.getDescription());
			entity.setMetalKbn(input.getMaterials());

			saveFunc.accept(entity);
			        
			//  MultipartFile（画像ファイル）がnullでなければ画像DIR情報登録
			if (input.getImageFile() != null && !input.getImageFile().isEmpty()) {
				insertFileDirInfo(msNumber, partsId, partsCategory);
			}
		}
	 }
	 
	 /**
	  * 部品画像ファイルのDIRをインサートする
	  * @param msNumber
	  * @param partsId
	  */
	 protected void insertFileDirInfo(String msNumber , String partsId, String partsCategory){

		 PartFileInfo entity = new PartFileInfo();
		 
		 //utilsの関数の戻り値を格納する
		 String fileDirPath = FileEditUtils.buildPartPath(msNumber, partsId, partsCategory);
		 
		 // すでに存在していたらスキップ（または上書き）
		 PartFileInfo existing = partFileInfoRepo.findByFileDir(fileDirPath);
		 if (existing != null) {
			 // 上書きしない or 上書き処理も可能（必要ならここに追記）
			 return;
		 }

		 entity.setMobileSuitNumber(msNumber);
		 entity.setPartsId(partsId);
		 entity.setPartsType(partsCategory);
		 entity.setFileDir(fileDirPath);
		 
		 partFileInfoRepo.save(entity);
	 }
	
}
