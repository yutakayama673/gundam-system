package com.example.gundamsystem.service;

import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.gundamsystem.dto.LoginRequest;
import com.example.gundamsystem.dto.RegisterRequest;
import com.example.gundamsystem.model.Employee;
import com.example.gundamsystem.repository.EmployeeRepository;

@Service
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private static final Pattern EMAIL_REGEX =
        Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    @Autowired
    public AuthService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        if (employeeRepository.findByEmployeeId(request.getEmployeeId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", "error", "message", "社員IDが重複しています"));
        }

        if (!EMAIL_REGEX.matcher(request.getEmail()).matches()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("status", "error", "message", "メールアドレスの形式が正しくありません"));
        }

        Employee employee = new Employee();
        employee.setEmployeeId(request.getEmployeeId());
        employee.setName(request.getName());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employee.setEmail(request.getEmail());

        employeeRepository.save(employee);

        return ResponseEntity.ok(Map.of("status", "success", "message", "登録完了"));
    }

    public ResponseEntity<?> login(LoginRequest request) {
        Employee employee = employeeRepository.findByEmployeeId(request.getEmployeeId());

        if (employee == null || !passwordEncoder.matches(request.getPassword(), employee.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("status", "error", "message", "IDまたはパスワードが正しくありません"));
        }

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "ログイン成功",
                "name", employee.getName()
        ));
    }
}
