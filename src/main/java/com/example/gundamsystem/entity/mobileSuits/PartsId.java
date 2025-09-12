package com.example.gundamsystem.entity.mobileSuits;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PartsId implements Serializable {
    private String mobileSuitNumber;
    private String partsId;

    public PartsId() {}

    public PartsId(String mobileSuitNumber, String partsId) {
        this.mobileSuitNumber = mobileSuitNumber;
        this.partsId = partsId;
    }

    public String getMobileSuitNumber() {
        return mobileSuitNumber;
    }

    public void setMobileSuitNumber(String mobileSuitNumber) {
        this.mobileSuitNumber = mobileSuitNumber;
    }

    public String getPartsId() {
        return partsId;
    }

    public void setPartsId(String partsId) {
        this.partsId = partsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PartsId)) return false;
        PartsId that = (PartsId) o;
        return Objects.equals(mobileSuitNumber, that.mobileSuitNumber) &&
               Objects.equals(partsId, that.partsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(mobileSuitNumber, partsId);
    }
}
