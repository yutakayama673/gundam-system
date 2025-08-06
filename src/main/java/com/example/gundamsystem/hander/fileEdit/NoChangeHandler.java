package com.example.gundamsystem.hander.fileEdit;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.model.home.GumdamInfoMasterFileInfo;

class NoChangeHandler implements FileEditHandler {
    @Override
    public ResponseEntity<?> handle(String mobileSuitNumber, MultipartFile imageFront, MultipartFile imageBack, List<GumdamInfoMasterFileInfo> files) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("画像ファイルの変更は行いません。");
    }
}