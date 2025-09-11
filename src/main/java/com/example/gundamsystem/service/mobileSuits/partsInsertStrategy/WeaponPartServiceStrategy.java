package com.example.gundamsystem.service.mobileSuits.partsInsertStrategy;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.SaveMobileSuitPartsRequest;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoWeapon;
import com.example.gundamsystem.repository.mobileSuits.GundamInfoWeaponRepository;

@Service
public class WeaponPartServiceStrategy implements PartServiceStrategy<GundamInfoWeapon> {

    private final GundamInfoWeaponRepository repository;

    public WeaponPartServiceStrategy(GundamInfoWeaponRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<GundamInfoWeapon> findByMobileSuitNumber(String msNumber) {
        return repository.findByMobileSuitNumberOrderByPartsIndex(msNumber);
    }
    
    @Override
    public GundamInfoWeapon findByMsNumberAndPartName(String msNumber, String partName) {
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
    	GundamInfoWeapon entity = new GundamInfoWeapon();

        // 業務ルールでID生成
        String partsId = String.format("%02d", info.getPartsIndex());
        entity.setPartsId(partsId);

        entity.setMobileSuitNumber(msNumber);
        entity.setPartsIndex(info.getPartsIndex());
        entity.setPartsName(info.getPartName());
        entity.setPartsFunction(info.getPartsFunction());
        entity.setPartsDiscription(info.getDescription());
        entity.setMetalKbn(info.getMaterials());
        entity.setPartsCategory("ARMS");

        repository.save(entity);
    }
}