package com.example.gundamsystem.utils;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


public class FileEditUtils {

	// png/mobileSuitsディレクトリをベースにする
    public static final Path MOBILE_SUIT_DIR_PNG = Paths.get("src/main/resources/static/png/mobileSuits")
                                                    .toAbsolutePath()
                                                    .normalize();
    
    public static final Path MOBILE_SUIT_DIR_HTML = Paths.get("src/main/resources/static/mobileSuits")
    												.toAbsolutePath()
    												.normalize();
    
    public static final String FILE_EXT = ".png";
    public static final String FRONT = "_front";
    public static final String BACK = "_back";
    public static final String MID_DIR_PNG = "/png/mobileSuits/";
    public static final String DIR_HTML_MS = "/mobileSuits/";
    /**
     * DBに保存する相対パス（例：/uploads/png/mobileSuits/MS-001/MS-001_front.png）
     */
    public static String buildRelativePath(String msNumber, boolean isFront) {
        return  MID_DIR_PNG + msNumber + "/" + buildImageFileName(msNumber, isFront);
    }

    /**
     * 保存用のファイル名
     */
    public static String buildImageFileName(String msNumber, boolean isFront) {
        return msNumber + (isFront ? FRONT : BACK) + FILE_EXT;
    }

    /**
     * 相対パスから保存先の絶対パスを取得
     */
    public static Path resolveFullPathPng(String relativePath) {
        // relativePath: "/png/mobileSuits/MS-001/MS-001_front.png"
    	 String relative = relativePath.replaceFirst("^/png/mobileSuits/", "");
    	 return MOBILE_SUIT_DIR_PNG.resolve(relative).normalize();
    }
    
    /**
    * 相対パスから保存先の絶対パスを取得
    */
   public static Path resolveFullPathHtml(String relativePath) {
       // relativePath: "/mobileSuits/RX-78-2/RX-78-2.html"
   	 String relative = relativePath.replaceFirst("^/mobileSuits/", "");
   	 return MOBILE_SUIT_DIR_HTML.resolve(relative).normalize();
   }
   /**
    * 部品の画像ファイルパス生成
    * @param msNumber
    * @param partsId
    * @param partsCategory
    * @return
    */
   public static String buildPartPath(String msNumber , String partsId, String partsCategory) {
	   
	   String relativePath = MID_DIR_PNG + msNumber + "/" + msNumber + "_" + partsId + "_" + partsCategory + FILE_EXT;
	   	   
	   return relativePath;
   }
   /**
    * ファイルを削除する
    * @param relativePath
    * @return
    */
   public static boolean deletePartsFile(String relativePath) {
	   
	   Path fullPath = resolveFullPathPng(relativePath);
	   
	   try {
           return Files.deleteIfExists(fullPath);
       } catch (IOException e) {
           e.printStackTrace();
           return false;
       }
   }


}
