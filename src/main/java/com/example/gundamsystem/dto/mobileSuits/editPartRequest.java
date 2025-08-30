package com.example.gundamsystem.dto.mobileSuits;

import java.util.List;

public class editPartRequest {

	private String msNumber;     // モビルスーツ番号
    private String partType;     // 部品種別
    private UpdatedData updatedData; // 更新データ

    // getter / setter
    public String getMsNumber() { return msNumber; }
    public void setMsNumber(String msNumber) { this.msNumber = msNumber; }

    public String getPartType() { return partType; }
    public void setPartType(String partType) { this.partType = partType; }

    public UpdatedData getUpdatedData() { return updatedData; }
    public void setUpdatedData(UpdatedData updatedData) { this.updatedData = updatedData; }

    // 内部クラス for updatedData
    public static class UpdatedData {
    	private String partName;
        private String description;   // 部品説明
        private String function;      // 部品機能
        private List<String> materials; // 部品素材

        
        public String getPartName() { return partName; }
        public void setPartName(String partName) { this.partName = partName; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getFunction() { return function; }
        public void setFunction(String function) { this.function = function; }

        public List<String> getMaterials() { return materials; }
        public void setMaterials(List<String> materials) { this.materials = materials; }
        
        
    }
}
