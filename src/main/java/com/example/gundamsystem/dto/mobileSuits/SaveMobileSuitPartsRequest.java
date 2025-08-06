package com.example.gundamsystem.dto.mobileSuits;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class SaveMobileSuitPartsRequest {

    private String msNumber;
    private int partTypeId;
    private List<PartInfo> parts;

    // Getter/Setter

    public static class PartInfo {
        private String partName;
        private int partsIndex;
        private String partsFunction;
        private String description;
        private String materials;
        private MultipartFile imageFile;

        public String getPartName() {
        	return partName;
        }
        
        public void setPartName(String partName) {
        	this.partName = partName;
        }
        
        public int getPartsIndex() {
        	return partsIndex;
        }
        
        public void setPartsIndex(int partsIndex) {
        	this.partsIndex = partsIndex;
        }
        
        public String getPartsFunction() {
        	return partsFunction;
        }
        
        public void setPartsFunction(String partsFunction) {
        	this.partsFunction = partsFunction;
        }
        
        public String getDescription() {
        	return description;
        }
        
        public void setDescription(String description) {
        	this.description = description;
        }
        
        public MultipartFile getImageFile() {
            return imageFile;
        }

        public void setImageFile(MultipartFile imageFile) {
            this.imageFile = imageFile;
        }

		public String getMaterials() {
			return materials;
		}

		public void setMaterials(String materials) {
			this.materials = materials;
		}
    }

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

	public List<PartInfo> getParts() {
		return parts;
	}

	public void setParts(List<PartInfo> parts) {
		this.parts = parts;
	}
}
