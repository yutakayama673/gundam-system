package com.example.gundamsystem.entity.mobileSuits;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "gumdam_info_head")
public class GundamInfoHead implements PartsEntity {

    @Id
    @Column(name = "parts_id", length = 50, nullable = false)
    private String partsId;

    @Column(name = "mobile_suit_number", length = 20, nullable = false)
    private String mobileSuitNumber;

    @Column(name = "parts_index", nullable = false, precision = 3, scale = 0)
    private Integer partsIndex;

    @Column(name = "parts_name", length = 100, nullable = false)
    private String partsName;

    @Column(name = "parts_function", length = 1000, nullable = false)
    private String partsFunction;

    @Column(name = "parts_discription", length = 1000, nullable = false)
    private String partsDiscription;

    @Column(name = "metal_kbn", length = 1, nullable = false)
    private String metalKbn;

    @Column(name = "parts_category", length = 10, nullable = false)
    private String partsCategory;

    // ======= Getter & Setter =======

    public String getPartsId() {
        return partsId;
    }

    public void setPartsId(String partsId) {
        this.partsId = partsId;
    }

    public String getMobileSuitNumber() {
        return mobileSuitNumber;
    }

    public void setMobileSuitNumber(String mobileSuitNumber) {
        this.mobileSuitNumber = mobileSuitNumber;
    }

    public Integer getPartsIndex() {
        return partsIndex;
    }

    public void setPartsIndex(Integer partsIndex) {
        this.partsIndex = partsIndex;
    }

    public String getPartsName() {
        return partsName;
    }

    public void setPartsName(String partsName) {
        this.partsName = partsName;
    }

    public String getPartsFunction() {
        return partsFunction;
    }

    public void setPartsFunction(String partsFunction) {
        this.partsFunction = partsFunction;
    }

    public String getPartsDiscription() {
        return partsDiscription;
    }

    public void setPartsDiscription(String partsDiscription) {
        this.partsDiscription = partsDiscription;
    }

    public String getMetalKbn() {
        return metalKbn;
    }

    public void setMetalKbn(String metalKbn) {
        this.metalKbn = metalKbn;
    }

    public String getPartsCategory() {
        return partsCategory;
    }

    public void setPartsCategory(String partsCategory) {
        this.partsCategory = partsCategory;
    }
}

