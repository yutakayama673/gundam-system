package com.example.gundamsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.gundamsystem.mapper.home")
public class GundamSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(GundamSystemApplication.class, args);
	}

}
