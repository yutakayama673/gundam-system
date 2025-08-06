package com.example.gundamsystem.model.home;

public class GumdamInfoMasterFileInfo {
	
	
	private String imageFront;
	
	private String imageBack;

	public String getImageFront() {
		return imageFront;
	}

	public void setImageFront(String imageFront) {
		this.imageFront = imageFront;
	}

	public String getImageBack() {
		return imageBack;
	}

	public void setImageBack(String imageBack) {
		this.imageBack = imageBack;
	}

	@Override
	public String toString() {
	    return String.format(
	        "[%s, %s, %s, %s, %s]",
	        imageFront,
	        imageBack
	    );
	}

	
}
