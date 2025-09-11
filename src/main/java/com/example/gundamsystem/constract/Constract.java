package com.example.gundamsystem.constract;

public class Constract {
	
	/*
	 *更新を行う
	 */
	public static final boolean UPDATE_FLG = true;
	
	/*
	 *新規作成時
	 */
	public static final boolean CREATE_FILE_FLG = false;
	
	/*
	 * 頭
	 */
	public static final int HEAD_NUM = 1;
	
	/*
	 * アーム
	 */
	public static final int ARMS_NUM = 2;
	
	/**
	 * ボディー
	 */
	public static final int BODY_NUM = 3;
	
	/*
	 * 足
	 */
	public static final int LEGS_NUM = 4;
	
	/**
	 * 武器
	 */
	public static final int WEAPON_NUM = 5;
	
	/**
	 * 
	 * @param ctgry
	 * @return
	 */
	public static String CHANGE_PARTS_CTGRY(int ctgry) {
	    switch (ctgry) {
	        case HEAD_NUM:
	            return "head";
	        case ARMS_NUM:
	            return "arms";
	        case BODY_NUM:
	            return "body";
	        case LEGS_NUM:
	            return "legs";
	        case WEAPON_NUM:
	            return "weapon";
	        default:
	        	 throw new IllegalArgumentException("不正なカテゴリ番号");
	    }
	}
	/**
	 * 
	 * @param ctgry
	 * @return
	 */
	public static String CHANGE_PARTS_ID_STR(int ctgry) {
	    switch (ctgry) {
	        case HEAD_NUM:
	            return "_HEAD_";
	        case ARMS_NUM:
	            return "_ARMS_";
	        case BODY_NUM:
	            return "_BODY_";
	        case LEGS_NUM:
	            return "_LEGS_";
	        case WEAPON_NUM:
	            return "_WEAPON_";
	        default:
	        	 throw new IllegalArgumentException("不正なカテゴリ番号");
	    }
	}
	/*
	 * 頭
	 */
	public static final String HEAD = "Head";
	
	/*
	 * アーム
	 */
	public static final String ARMS = "Arms";
	
	/**
	 * ボディー
	 */
	public static final String BODY = "Body";
	
	/*
	 * 足
	 */
	public static final String LEGS = "Legs";
	
	/**
	 * 武器
	 */
	public static final String WEAPON = "Weapon";
	
	

}
