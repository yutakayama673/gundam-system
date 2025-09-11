package com.example.gundamsystem.service.mobileSuits.partsInsertStrategy;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.gundamsystem.constract.Constract;
import com.example.gundamsystem.entity.mobileSuits.PartsEntity;

@Service
public class MobileSuitPartContext {

    private final Map<Integer, PartServiceStrategy<? extends PartsEntity>> strategies;

    public MobileSuitPartContext(
        HeadPartServiceStrategy head,
        ArmsPartServiceStrategy arms,
        BodyPartServiceStrategy body,
        LegsPartServiceStrategy legs,
        WeaponPartServiceStrategy weapon
    ) {
        strategies = new HashMap<>();
        strategies.put(Constract.HEAD_NUM, head);
        strategies.put(Constract.ARMS_NUM, arms);
        strategies.put(Constract.BODY_NUM, body);
        strategies.put(Constract.LEGS_NUM, legs);
        strategies.put(Constract.WEAPON_NUM, weapon);
    }

    public PartServiceStrategy<? extends PartsEntity> getStrategy(int partTypeId) {
        return strategies.get(partTypeId);
    }
}

