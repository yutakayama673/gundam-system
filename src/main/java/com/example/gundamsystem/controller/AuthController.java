package com.example.gundamsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gundamsystem.dto.LoginRequest;
import com.example.gundamsystem.dto.RegisterRequest;
import com.example.gundamsystem.service.AuthService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // セッションを無効化
        return "redirect:/gundam-system/login.html"; // login.htmlにリダイレクト
    }
}
