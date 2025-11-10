package com.example.gundamsystem.service.mobileSuits.partEditStrategy;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.editPartRequest.UpdatedData;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoHead;
import com.example.gundamsystem.service.mobileSuits.MsService;

@Service("Head")
public class HeadPartEditStrategy extends MsService implements PartEditStrategy {


    @Override
    public void edit(String msNumber, UpdatedData updatedData) {
        Map<String, GundamInfoHead> map = headPartsRepository
            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
            .stream()
            .collect(Collectors.toMap(GundamInfoHead::getPartsName, h -> h));

        GundamInfoHead entity = map.get(updatedData.getPartName());
        if (entity == null) {
            throw new IllegalArgumentException("指定された部品名は存在しません: " + updatedData.getPartName());
        }

        entity.setPartsDiscription(updatedData.getDescription());
        entity.setPartsFunction(updatedData.getFunction());
        entity.setMetalKbn(updatedData.getMaterials() != null
            ? String.join(",", updatedData.getMaterials())
            : null);

        headPartsRepository.save(entity);
    }
}
