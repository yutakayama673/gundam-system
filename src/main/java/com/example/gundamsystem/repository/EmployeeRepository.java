package com.example.gundamsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gundamsystem.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // 社員IDで検索（ログイン時などに使用）
    Employee findByEmployeeId(String employeeId);
}
