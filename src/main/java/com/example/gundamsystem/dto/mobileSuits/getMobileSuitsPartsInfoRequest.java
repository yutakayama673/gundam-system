package com.example.gundamsystem.dto.mobileSuits;

public class getMobileSuitsPartsInfoRequest {
	
	private String msNumber;
	
	private int partsTypeId;
	
	
	
	public getMobileSuitsPartsInfoRequest(String msNumber, int partsTypeId) {
		
		this.msNumber = msNumber;
		this.partsTypeId = partsTypeId;
		
	}


	public String getMsNumber() {
		return msNumber;
	}


	public void setMsNumber(String msNumber) {
		this.msNumber = msNumber;
	}


	public int getPartsTypeId() {
		return partsTypeId;
	}


	public void setPartsTypeId(int partsTypeId) {
		this.partsTypeId = partsTypeId;
	}

}
