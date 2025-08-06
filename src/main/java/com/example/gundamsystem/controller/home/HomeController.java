package com.example.gundamsystem.controller.home;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.dto.home.GumdamInfoDto;
import com.example.gundamsystem.model.home.GumdamInfoMaster;
import com.example.gundamsystem.service.fileEdit.FileEditService;
import com.example.gundamsystem.service.home.HomeService;

@RestController
@RequestMapping("/api")
public class HomeController {
	
	@Autowired
	private HomeService homeService;
	
	@Autowired
	private FileEditService fileEditService;
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @param mobileSuitName
	 * @param pilot
	 * @return
	 */
	@GetMapping("/gumdamInfos")
	public List<GumdamInfoMaster> getGumdamInfoMaster(
			 @RequestParam(required = false) String mobileSuitNumber,
			 @RequestParam(required = false) String mobileSuitName,
			 @RequestParam(required = false) String pilot
			 ){
		
		return homeService.getGumdamInfoAllData(mobileSuitNumber, mobileSuitName, pilot);
	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	@PostMapping("/gumdamInfoRegister")
	public ResponseEntity<?> updateGumdamInfoMaster(@RequestBody GumdamInfoDto request){
		
		return homeService.registerGumdamInfoMaster(request);
	}
	
	/**
	 * 
	 * @param mobileSuitNumber
	 * @param imageFront
	 * @param imageBack
	 * @return
	 */
	@PostMapping("/uploadImagesHome")
	public ResponseEntity<?> uploadImages(
		    @RequestParam("mobileSuitNumber") String mobileSuitNumber,
		    @RequestParam(value = "imageFront", required = false) MultipartFile imageFront,
		    @RequestParam(value = "imageBack", required = false) MultipartFile imageBack) {
		  
		 return fileEditService.uploadImages(mobileSuitNumber,imageFront,imageBack,Constract.CREATE_FILE_FLG);
	}

}
