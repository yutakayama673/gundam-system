package com.example.gundamsystem.service.mobileSuits.partsInsertStrategy;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoBody;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoBodyRepository;

@Service
public class BodyPartServiceStrategy implements PartServiceStrategy<GundamInfoBody> {

    private final GundamInfoBodyRepository repository;

    public BodyPartServiceStrategy(GundamInfoBodyRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<GundamInfoBody> findByMobileSuitNumber(String msNumber) {
        return repository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
    }
    
    @Override
    public GundamInfoBody findByMsNumberAndPartName(String msNumber, String partName) {
        return repository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName);
    }
    
    @Override
    public int findMaxIndex(String msNumber) {
        return repository.findMaxIndex(msNumber);
    }
    
    @Override
    public boolean existsByMsNumberAndPartsName(String msNumber, String partName) {
        return repository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(msNumber, partName) != null;
    }

    @Override
    public void save(String msNumber, SaveMobileSuitPartsRequest.PartInfo info) {
    	GundamInfoBody entity = new GundamInfoBody();

        // 業務ルールでID生成
        String partsId = String.format("%02d", info.getPartsIndex());
        entity.setPartsId(partsId);

        entity.setMobileSuitNumber(msNumber);
        entity.setPartsIndex(info.getPartsIndex());
        entity.setPartsName(info.getPartName());
        entity.setPartsFunction(info.getPartsFunction());
        entity.setPartsDiscription(info.getDescription());
        entity.setMetalKbn(info.getMaterials());
        entity.setPartsCategory("BODY");

        repository.save(entity);
    }
    
    @Override
    public void update(String msNumber, SaveMobileSuitPartsRequest.PartInfo info) {
    	GundamInfoBody entity = repository.findByMobileSuitNumberAndPartsNameOrderByPartsIndex(
                msNumber, info.getPartName());
        if (entity == null) {
            throw new IllegalArgumentException("部品が存在しません: " + info.getPartName());
        }
        entity.setPartsFunction(info.getPartsFunction());
        entity.setPartsDiscription(info.getDescription());
        entity.setMetalKbn(String.join(",", info.getMaterials()));
        repository.save(entity); // save は update としても動く
    }
    
}