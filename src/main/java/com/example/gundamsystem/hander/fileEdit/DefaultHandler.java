package com.example.gundamsystem.hander.fileEdit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.model.home.GumdamInfoMasterFileInfo;
import com.example.gundamsystem.utils.FileEditUtils;

class DefaultHandler implements FileEditHandler {
    @Override
    public ResponseEntity<?> handle(String mobileSuitNumber, MultipartFile imageFront, MultipartFile imageBack, List<GumdamInfoMasterFileInfo> files) {
        try {
            for (GumdamInfoMasterFileInfo file : files) {
                if (imageFront != null && !imageFront.isEmpty()) {
                    Path frontPath = FileEditUtils.resolveFullPathPng(file.getImageFront());
                    Files.createDirectories(frontPath.getParent());
                    imageFront.transferTo(frontPath.toFile());
                }
                if (imageBack != null && !imageBack.isEmpty()) {
                    Path backPath = FileEditUtils.resolveFullPathPng(file.getImageBack());
                    Files.createDirectories(backPath.getParent());
                    imageBack.transferTo(backPath.toFile());
                }
            }
            return ResponseEntity.ok("画像アップロード完了");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("画像の保存に失敗しました");
        }
    }
}
