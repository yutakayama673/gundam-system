package com.example.gundamsystem.hander.fileEdit;

import org.springframework.web.multipart.MultipartFile;

public class FileEditHandlerFactory {
    
	public static FileEditHandler getHandler(MultipartFile imageFront,
                                             MultipartFile imageBack,
                                             boolean checkUpdate) {
        if (checkUpdate) {
            if (imageFront == null && imageBack == null) {
                return new NoChangeHandler();
            } else if (imageFront != null && imageBack == null) {
                return new FrontImageUpdateHandler();
            } else if (imageFront == null && imageBack != null) {
                return new BackImageUpdateHandler();
            }
        }
        return new DefaultHandler();
    }
}