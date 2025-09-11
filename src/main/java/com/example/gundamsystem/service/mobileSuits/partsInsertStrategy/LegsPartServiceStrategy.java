package com.example.gundamsystem.service.mobileSuits.partsInsertStrategy;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoLegs;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoLegsRepository;

@Service
public class LegsPartServiceStrategy implements PartServiceStrategy<GundamInfoLegs> {

    private final GundamInfoLegsRepository repository;

    public LegsPartServiceStrategy(GundamInfoLegsRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<GundamInfoLegs> findByMobileSuitNumber(String msNumber) {
        return repository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
    }
    
    @Override
    public GundamInfoLegs findByMsNumberAndPartName(String msNumber, String partName) {
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
        GundamInfoLegs entity = new GundamInfoLegs();

        // 業務ルールでID生成
        String partsId = String.format("%02d", info.getPartsIndex());
        entity.setPartsId(partsId);

        entity.setMobileSuitNumber(msNumber);
        entity.setPartsIndex(info.getPartsIndex());
        entity.setPartsName(info.getPartName());
        entity.setPartsFunction(info.getPartsFunction());
        entity.setPartsDiscription(info.getDescription());
        entity.setMetalKbn(info.getMaterials());
        entity.setPartsCategory("LEG");

        repository.save(entity);
    }
}
