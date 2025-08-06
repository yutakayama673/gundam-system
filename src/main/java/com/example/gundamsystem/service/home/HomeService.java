package com.example.gundamsystem.service.home;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.home.GumdamInfoDto;
import com.example.gundamsystem.entity.home.GumdamInfoMasterEnt;
import com.example.gundamsystem.mapper.home.GundamInfoMasterMapper;
import com.example.gundamsystem.model.home.GumdamInfoMaster;
import com.example.gundamsystem.repository.home.GundamInfoMasterRepo;
import com.example.gundamsystem.utils.FileEditUtils;


@Service
public class HomeService {
	
	private final GundamInfoMasterMapper mapper;
	private final GundamInfoMasterRepo repo;
	
	@Autowired
	public HomeService(GundamInfoMasterMapper mapper, GundamInfoMasterRepo repo) {
		this.mapper = mapper;
		this.repo = repo;
	}

	/**
	 * 検索 モビルスーツマスター情報
	 * @param mobileSuitNumber
	 * @param mobileSuitName
	 * @param pilot
	 * @return
	 */
    public List<GumdamInfoMaster> getGumdamInfoAllData(
            String mobileSuitNumber, 
            String mobileSuitName, 
            String pilot
    ) {
    	
    	 List<GumdamInfoMaster> result = mapper.findByCondition(mobileSuitNumber, mobileSuitName, pilot);
    	 
        return result;
    }
    
    /**
     * 更新 モビルスーツマスター情報
     * @param request
     * @return
     */
	public ResponseEntity<?> registerGumdamInfoMaster(GumdamInfoDto request) {
		
		//テーブル重複チェック
		if (repo.findBymobileSuitNumber(request.getMobileSuitNumber()) != null
				&& repo.findBymobileSuitName(request.getMobileSuitName()) != null) {
			
	        return ResponseEntity.status(HttpStatus.CONFLICT)
	                    .body(Map.of("status", "error", "message", "モビルスーツが重複しています"));
	    
	    }
		
		setGumdamInfoMaster(request);
		
		return ResponseEntity.ok(Map.of("status", "success", "message", "登録完了"));
	}
	
	/**
	 * 
	 * モビルスーツマスター情報へ更新する
	 *  @param request
	 */
	private void setGumdamInfoMaster(GumdamInfoDto request) {
	    GumdamInfoMasterEnt entity = new GumdamInfoMasterEnt();

	    entity.setMobileSuitNumber(request.getMobileSuitNumber());
	    entity.setMobileSuitName(request.getMobileSuitName());
	    entity.setPilot(request.getPilot());
	    entity.setStartDesignDate(request.getStartDesignDate());
	    entity.setEndDesignDate(request.getEndDesignDate());
	    entity.setMessage(request.getMessage());
	    entity.setBelong(request.getBelong());

	    //フルパス取得
	    String relFrontPath = FileEditUtils.buildRelativePath(request.getMobileSuitNumber(), true);
	    String relBackPath = FileEditUtils.buildRelativePath(request.getMobileSuitNumber(), false);

	    entity.setImageFront(relFrontPath);  
	    entity.setImageBack(relBackPath);

	    repo.save(entity);
	}
	
}












