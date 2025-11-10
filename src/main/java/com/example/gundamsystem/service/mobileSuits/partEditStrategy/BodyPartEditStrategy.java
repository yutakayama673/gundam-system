package com.example.gundamsystem.service.mobileSuits.partEditStrategy;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.editPartRequest.UpdatedData;
import com.example.gundamsystem.entity.mobileSuits.GundamInfoBody;
import com.example.gundamsystem.service.mobileSuits.MsService;

@Service("Body")
public class BodyPartEditStrategy extends MsService implements PartEditStrategy {


    @Override
    public void edit(String msNumber, UpdatedData updatedData) {
        Map<String, GundamInfoBody> map = bodyPartsRepository
            .findByMobileSuitNumberOrderByPartsIndex(msNumber)
            .stream()
            .collect(Collectors.toMap(GundamInfoBody::getPartsName, h -> h));

        GundamInfoBody entity = map.get(updatedData.getPartName());
        if (entity == null) {
            throw new IllegalArgumentException("指定された部品名は存在しません: " + updatedData.getPartName());
        }

        entity.setPartsDiscription(updatedData.getDescription());
        entity.setPartsFunction(updatedData.getFunction());
        entity.setMetalKbn(updatedData.getMaterials() != null
            ? String.join(",", updatedData.getMaterials())
            : null);

        bodyPartsRepository.save(entity);
    }
}
