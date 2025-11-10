package com.example.gundamsystem.service.mobileSuits.partEditStrategy;

import com.example.gundamsystem.dto.mobileSuits.editPartRequest.UpdatedData;

public interface PartEditStrategy {
    void edit(String msNumber, UpdatedData updatedData);
}

