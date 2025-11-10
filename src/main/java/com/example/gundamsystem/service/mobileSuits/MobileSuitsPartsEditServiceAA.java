package com.example.gundamsystem.service.mobileSuits;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.mobileSuits.editPartRequest.UpdatedData;
import com.example.gundamsystem.service.mobileSuits.partEditStrategy.PartEditStrategy;


public class MobileSuitsPartsEditServiceAA {

    private final Map<String, PartEditStrategy> strategies;

    public MobileSuitsPartsEditServiceAA(List<PartEditStrategy> strategies) {
        // @Service の value をキーに使うことで、HEAD/ARMS/... で呼び分けできる
        this.strategies = strategies.stream()
            .collect(Collectors.toMap(
                s -> s.getClass().getAnnotation(Service.class).value(),
                s -> s
            ));
    }

    public ResponseEntity<?> editPart(String msNumber, String partType, UpdatedData updatedData) {
        PartEditStrategy strategy = strategies.get(partType.toUpperCase());
        if (strategy == null) {
            return ResponseEntity.badRequest().body("未対応のパーツ種別です: " + partType);
        }
        strategy.edit(msNumber, updatedData);
        return ResponseEntity.ok("更新に成功しました");
    }
}

