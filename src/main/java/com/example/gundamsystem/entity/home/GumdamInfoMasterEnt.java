package com.example.gundamsystem.entity.home;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "GUMDAM_INFO_MASTER")
public class GumdamInfoMasterEnt {
    
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mobileSuitId;  // これが主キー
    
    @Column(name = "mobile_suit_number")
    private String mobileSuitNumber;
	

    @Column(name = "mobile_suit_name")
    private String mobileSuitName;

    @Column(name = "pilot")
    private String pilot;

    @Column(name = "start_design_date")
    private String startDesignDate;

    @Column(name = "end_design_date")
    private String endDesignDate;
    
    @Column(name = "message")
    private String message;
    
    @Column(name = "belong")
    private String belong;
    
    @Column(name = "image_front")
    private String imageFront;
    
    @Column(name = "image_back")
    private String imageBack;
    
    

    // --- Getter / Setter ---

	public Long getMobileSuitId() {
		return mobileSuitId;
	}

	public void setMobileSuitId(Long mobileSuitId) {
		this.mobileSuitId = mobileSuitId;
	}

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

	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

    @Override
    public String toString() {
        return "GumdamInfoMaster{" +
        		", mobileSuitId='" + mobileSuitId + '\'' +
                ", mobileSuitNumber='" + mobileSuitNumber + '\'' +
                ", mobileSuitName='" + mobileSuitName + '\'' +
                ", pilot='" + pilot + '\'' +
                ", startDesignDate='" + startDesignDate + '\'' +
                ", endDesignDate='" + endDesignDate + '\'' +
                ", message='" + message + '\'' +
                ", belong='" + belong + '\'' +
                ", imageFront='" + imageFront + '\'' +
                ", imageBack='" + imageBack + '\'' +
                '}';
    }

}
