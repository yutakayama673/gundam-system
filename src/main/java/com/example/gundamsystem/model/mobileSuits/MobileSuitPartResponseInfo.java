package com.example.gundamsystem.model.mobileSuits;

public class MobileSuitPartResponseInfo {

	private String partsName;
    private String function;
    private String description;
    private String materials;

    // コンストラクタ
    public MobileSuitPartResponseInfo(String partsName, String function, String description, String materials) {
        this.partsName = partsName;
        this.function = function;
        this.description = description;
        this.materials = materials;
    }

    public MobileSuitPartResponseInfo() {
		// TODO 自動生成されたコンストラクター・スタブ
	}

	// Getter / Setter
    public String getPartsName() {
        return partsName;
    }

    public void setPartsName(String partsName) {
        this.partsName = partsName;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public String getMaterials() {
		return materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}
}
