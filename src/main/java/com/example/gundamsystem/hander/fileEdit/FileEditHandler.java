package com.example.gundamsystem.hander.fileEdit;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.gundamsystem.model.home.GumdamInfoMasterFileInfo;

public interface FileEditHandler {
    ResponseEntity<?> handle(String mobileSuitNumber,
                             MultipartFile imageFront,
                             MultipartFile imageBack,
                             List<GumdamInfoMasterFileInfo> files);
}