package com.example.gundamsystem.model.home;

public class GumdamInfoMaster {
	
	private String mobileSuitNumber;
	
	private String mobileSuitName;
	
	private String pilot;
	
	private String startDesignDate;
	
	private String endDesignDate;
	
	private String message;
	
	private String belong;
	
	private String imageFront;
	
	private String imageBack;

	public String getMobileSuitNumber() {
		return mobileSuitNumber;
	}

	public void setMobileSuitNumber(String mobileSuitNumber) {
		this.mobileSuitNumber = mobileSuitNumber;
	}

	public String getMobileSuitName() {
		return mobileSuitName;
	}

	public void setMobileSuitName(String mobileSuitName) {
		this.mobileSuitName = mobileSuitName;
	}

	public String getPilot() {
		return pilot;
	}

	public void setPilot(String pilot) {
		this.pilot = pilot;
	}

	public String getStartDesignDate() {
		return startDesignDate;
	}

	public void setStartDesignDate(String startDesignDate) {
		this.startDesignDate = startDesignDate;
	}

	public String getEndDesignDate() {
		return endDesignDate;
	}

	public void setEndDesignDate(String endDesignDate) {
		this.endDesignDate = endDesignDate;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getBelong() {
		return belong;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}

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
	        mobileSuitNumber,
	        mobileSuitName,
	        pilot,
	        startDesignDate,
	        endDesignDate
	    );
	}

	
}
