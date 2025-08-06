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

class FrontImageUpdateHandler implements FileEditHandler {
    @Override
    public ResponseEntity<?> handle(String mobileSuitNumber, MultipartFile imageFront, MultipartFile imageBack, List<GumdamInfoMasterFileInfo> files) {
        try {
            for (GumdamInfoMasterFileInfo file : files) {
                Path path = FileEditUtils.resolveFullPathPng(file.getImageFront());
                Files.createDirectories(path.getParent());
                imageFront.transferTo(path.toFile());
            }
            return ResponseEntity.ok("前画像ファイルの変更を行いました。");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("前画像の保存に失敗しました。");
        }
    }
}
