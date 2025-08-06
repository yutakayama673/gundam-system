package com.example.gundamsystem.entity.mobileSuits;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "part_file_info")
public class PartFileInfo {

    @Column(name = "mobile_suit_number", nullable = false, length = 20)
    private String mobileSuitNumber;

    @Column(name = "parts_type", nullable = false, length = 20)
    private String partsType;

    @Column(name = "parts_id", nullable = false, length = 2)
    private String partsId;

    @Id
    @Column(name = "filedir", nullable = false, length = 100)
    private String fileDir;

    // --- Getter & Setter ---
    public String getMobileSuitNumber() {
        return mobileSuitNumber;
    }

    public void setMobileSuitNumber(String mobileSuitNumber) {
        this.mobileSuitNumber = mobileSuitNumber;
    }

    public String getPartsType() {
        return partsType;
    }

    public void setPartsType(String partsType) {
        this.partsType = partsType;
    }

    public String getPartsId() {
        return partsId;
    }

    public void setPartsId(String partsId) {
        this.partsId = partsId;
    }

    public String getFileDir() {
        return fileDir;
    }

    public void setFileDir(String fileDir) {
        this.fileDir = fileDir;
    }
}

