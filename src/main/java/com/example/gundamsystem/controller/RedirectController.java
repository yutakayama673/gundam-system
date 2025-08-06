package com.example.gundamsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    @GetMapping("/")
    public String redirectToLogin() {
        return "redirect:/gundam-system/login.html";
    }
  
}
