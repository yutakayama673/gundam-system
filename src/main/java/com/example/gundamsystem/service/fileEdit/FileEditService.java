package com.example.gundamsystem.service.fileEdit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest.PartInfo;
import com.example.gundamsystem.entity.mobileSuits.PartFileInfo;
import com.example.gundamsystem.hander.fileEdit.FileEditHandler;
import com.example.gundamsystem.hander.fileEdit.FileEditHandlerFactory;
import com.example.gundamsystem.mapper.home.GundamInfoMasterFileInfoMapper;
import com.example.gundamsystem.model.home.GumdamInfoMasterFileInfo;
import com.example.gundamsystem.repository.mobileSuits.PartFileInfoRepository;
import com.example.gundamsystem.utils.FileEditUtils;

@Service
public class FileEditService {

    private final GundamInfoMasterFileInfoMapper fileMapper;
    
    private final PartFileInfoRepository partFileInfoRepo;
    
    @Autowired
    public FileEditService(GundamInfoMasterFileInfoMapper fileMapper, PartFileInfoRepository partFileInfoRepo) {
        this.fileMapper = fileMapper;
        this.partFileInfoRepo = partFileInfoRepo;
    }
    /**
     * 
     * @param mobileSuitNumber
     * @param imageFront
     * @return
     */
    public ResponseEntity<?> uploadImages(String mobileSuitNumber,
                                          MultipartFile imageFront,
                                          MultipartFile imageBack,
                                          boolean checkUpdate) {

        List<GumdamInfoMasterFileInfo> files = fileMapper.findByMSNum(mobileSuitNumber);
        FileEditHandler handler = FileEditHandlerFactory.getHandler(imageFront, imageBack, checkUpdate);
        return handler.handle(mobileSuitNumber, imageFront, imageBack, files);
    }
    /**
     * 
     * @param mobileSuitNumber
     * @param imageFront
     * @return
     */
    public void uploadImagesParts(String msNumber, int partTypeId, List<PartInfo> parts) {
        // DBから既存の PartFileInfo を取得
        List<PartFileInfo> existingInfos = partFileInfoRepo.findByMobileSuitNumberAndPartsType(
            msNumber, Constract.CHANGE_PARTS_CTGRY(partTypeId));

        // partsId → PartFileInfo のマップを作成
        Map<String, PartFileInfo> partInfoMap = existingInfos.stream()
            .collect(Collectors.toMap(PartFileInfo::getPartsId, p -> p));

        for (PartInfo part : parts) {
            MultipartFile file = part.getImageFile();
            
            if(file == null || file.isEmpty()) {
            	continue;
            }

            // partsIndex を "01", "02" 形式に変換
            String partIdFormatted = String.format("%02d", part.getPartsIndex());

            // 対応する PartFileInfo を取得
            PartFileInfo info = partInfoMap.get(partIdFormatted);
            
            if(info != null) {
                try {
                    // 保存先パスを生成
                    Path path = FileEditUtils.resolveFullPathPng(info.getFileDir());

                    // 親ディレクトリを作成（なければ）
                    Files.createDirectories(path.getParent());

                    // ファイルを保存
                    file.transferTo(path.toFile());

                    System.out.println("保存完了: " + path);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    /**
     * 
     * @param msNumber
     */
    public void deleteAllFileByMsNumber(String msNumber) {
    	
    	List<GumdamInfoMasterFileInfo> info = fileMapper.findByMSNum(msNumber);
    	
    	int count = 0;

    	for (GumdamInfoMasterFileInfo in : info) {
    		
    		if (FileEditUtils.deletePartsFile(in.getImageBack())) {
    			
    			count++;
    		}
    		
    		if (FileEditUtils.deletePartsFile(in.getImageFront())) {
    			
    			count++;
    		}
    	}
    	
    	List<String> filesPart = partFileInfoRepo.findFileDirByMobileSuitNumber(msNumber);
    	
    	
    	if (!filesPart.isEmpty()) {
    	
    		for (String file : filesPart) {
    		
    			if (FileEditUtils.deletePartsFile(file)) {
    			
    				count++;
    			}
    		
    		}
    	}
    	
    	System.out.println("削除件数:" + count + "件");
    }
}
