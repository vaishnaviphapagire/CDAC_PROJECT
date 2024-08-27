package com.app.service;

import java.io.IOException;
import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.StudentProfileDto;
import com.app.dto.TeacherDto;
import com.app.dto.TeacherEditDto;
import com.app.dto.TeacherOutputDto;
import com.app.dto.TeacherProfileDto;
import com.app.entity.Teacher;


public interface TeacherService {
	ApiResponse addTeacher(TeacherDto teacher);
	
	List<Teacher> getAllTeacher();
	
	ApiResponse deleteTeacher(Long id);
	
	public TeacherProfileDto getteacherProfileById(Long id) throws IOException;
	
	public TeacherOutputDto getTeacherById(Long id);
	
	public ApiResponse updateteacher(TeacherEditDto dto);
	
	
	
}
