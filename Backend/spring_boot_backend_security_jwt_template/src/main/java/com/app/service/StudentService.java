package com.app.service;

import java.io.IOException;

import com.app.dto.ApiResponse;
import com.app.dto.StudentDto;
import com.app.dto.StudentEditDto;
import com.app.dto.StudentOutputDto;
import com.app.dto.StudentProfileDto;
import com.app.entity.Student;

public interface StudentService {

	public ApiResponse addStudent(StudentDto stud);
	
	public StudentOutputDto getStudentById(Long id);
		
	public ApiResponse updateStudentById (StudentEditDto dto);
}
