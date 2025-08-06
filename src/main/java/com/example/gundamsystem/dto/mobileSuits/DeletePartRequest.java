package com.example.gundamsystem.dto.mobileSuits;


public class DeletePartRequest {
    private String msNumber;
    private int partTypeId;
    private String partName;

    // --- Getter & Setter ---
    public String getMsNumber() {
        return msNumber;
    }

    public void setMsNumber(String msNumber) {
        this.msNumber = msNumber;
    }

    public int getPartTypeId() {
        return partTypeId;
    }

    public void setPartTypeId(int partTypeId) {
        this.partTypeId = partTypeId;
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }
}

