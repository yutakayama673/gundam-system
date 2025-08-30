package com.example.gundamsystem.controller.mobileSuits;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.dto.mobileSuits.DeletePartRequest;
import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest;
import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest.PartInfo;
import com.example.gundamsystem.dto.mobileSuits.editPartRequest;
import com.example.gundamsystem.dto.mobileSuits.getMobileSuitsPartsInfoRequest;
import com.example.gundamsystem.entity.home.GumdamInfoMasterEnt;
import com.example.gundamsystem.model.home.GumdamInfoMaster;
import com.example.gundamsystem.model.mobileSuits.MobileSuitPartResponseInfo;
import com.example.gundamsystem.model.mobileSuits.PartDetailResponseInfo;
import com.example.gundamsystem.service.fileEdit.FileEditService;
import com.example.gundamsystem.service.mobileSuits.DeleteMsService;
import com.example.gundamsystem.service.mobileSuits.MobileSuitsPartsEditService;
import com.example.gundamsystem.service.mobileSuits.MobileSuitsPartsSearchService;
import com.example.gundamsystem.service.mobileSuits.MoblieSuitsPartsService;
import com.example.gundamsystem.service.mobileSuits.MoblieSuitsService;

@RestController
@RequestMapping("/api")
public class MoblieSuitsController {
	
	@Autowired
    private MoblieSuitsService msService;
	
	@Autowired
	private FileEditService fileEditService;
	
	@Autowired
	private MoblieSuitsPartsService mspartService;
	
	@Autowired
	private DeleteMsService deleteMsService;
	
	@Autowired
	private MobileSuitsPartsSearchService partDetailService;
	
	@Autowired
	private MobileSuitsPartsEditService mobileSuitsPartsEditService;
	
	
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @param updatedData
	 * @return
	 */
	@PutMapping("/updateGumdamInfo/{mobileSuitNumber}")
    public ResponseEntity<GumdamInfoMasterEnt> update(
            @PathVariable String mobileSuitNumber,
            @RequestBody GumdamInfoMasterEnt updatedData) {
		GumdamInfoMasterEnt result = msService.updateGundamInfo(mobileSuitNumber, updatedData);
        return ResponseEntity.ok(result);
    }
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @return
	 */
	// DELETE /api/mobile-suits/{mobileSuitNumber}
    @DeleteMapping("/deleteMobileSuits/{mobileSuitNumber}")
    public ResponseEntity<String> deleteAllPartsByMobileSuitNumber(@PathVariable String mobileSuitNumber) {
    	
    	fileEditService.deleteAllFileByMsNumber(mobileSuitNumber);
       
        return deleteMsService.deleteMsInfo(mobileSuitNumber);
    }
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @param imageFront
	 * @param imageBack
	 * @return
	 */
	@PostMapping("/updateImagesMs")
	public ResponseEntity<?> updateImages(
		    @RequestParam("mobileSuitNumber") String mobileSuitNumber,
		    @RequestParam(value = "imageFront", required = false) MultipartFile imageFront,
		    @RequestParam(value = "imageBack", required = false) MultipartFile imageBack) {
		  
		 return fileEditService.uploadImages(mobileSuitNumber,imageFront,imageBack,Constract.UPDATE_FLG);
	}
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @return
	 */
	@GetMapping("/gumdamInfoMsNum")
	public List<GumdamInfoMaster> getGumdamInfoMasterByNsNum(
			 @RequestParam(required = false) String mobileSuitNumber
			 ){
		
		return msService.getGumdamInfoByMsNum(mobileSuitNumber);
	}
	
	/**
	 * 
	 * @param req
	 * @return
	 */
    @PostMapping("/getMobileSuitsParts")
    public ResponseEntity<Map<String, Map<String, List<String>>>> getParts(@RequestBody Map<String, String> req) {
        String msNumber = req.get("msNumber");
	        return msService.getParts(msNumber);
	 }
    
    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/getMobileSuitsPartsInfo")
    public ResponseEntity<List<MobileSuitPartResponseInfo>> getPartsInfo(@RequestBody getMobileSuitsPartsInfoRequest request) {
        String msNumber = request.getMsNumber();
        int partsTypeId = request.getPartsTypeId();
        
        return mspartService.getPartInfo(msNumber, partsTypeId);
    }
    
    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/saveMobileSuitsPartsInfo")
    public ResponseEntity<?> saveParts(@ModelAttribute SaveMobileSuitPartsRequest request) {
    	
        String msNumber = request.getMsNumber();
        int partTypeId = request.getPartTypeId();
        List<PartInfo> parts = request.getParts();
    	
        ResponseEntity<?> saveCheck = mspartService.registerPartsInfo(msNumber, partTypeId, parts);
        
        fileEditService.uploadImagesParts(msNumber, partTypeId, parts);
        	
    	return ResponseEntity.ok(saveCheck);
    }
    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/deletePart")
    public ResponseEntity<?> deletePart(@RequestBody DeletePartRequest request) {
        String msNumber = request.getMsNumber();
        int partTypeId = request.getPartTypeId();
        String partName = request.getPartName();

        return mspartService.deletePart(msNumber, partTypeId, partName);
    }
    
    /**
     * 
     * @param msNumber
     * @param partType
     * @param partName
     * @return
     */
    @GetMapping("/detail")
    public PartDetailResponseInfo getPartDetail(
            @RequestParam String msNumber,
            @RequestParam String partType,
            @RequestParam String partName
    ) {
        return partDetailService.getPartDetail(msNumber, partType, partName);
    }
    
    /**
     * 
     * @param request
     * @return
     */
    @PutMapping("/editPart")
    public ResponseEntity<?> editPart(@RequestBody editPartRequest request) {
    	
    	return mobileSuitsPartsEditService.editPart(
                    request.getMsNumber(),
                    request.getPartType(),
                    request.getUpdatedData()
                    );
    }
}
