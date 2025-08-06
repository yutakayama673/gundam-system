package com.example.gundamsystem.model.mobileSuits;

public class PartDetailResponseInfo {
	
    private String function;
    private String description;
    private String materials;
    private String imageUrl;

    public PartDetailResponseInfo() {
	}

	// getter・setter
    public String getFunction() { return function; }
    public void setFunction(String function) { this.function = function; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

	public String getMaterials() {
		return materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}


}
