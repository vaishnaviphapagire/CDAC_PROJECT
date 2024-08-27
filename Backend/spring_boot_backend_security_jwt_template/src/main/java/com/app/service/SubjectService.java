package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.entity.Subject;



public interface SubjectService {
	
	public List<Subject> getAllSubjects();
	
	public String addSubject(Subject subject);
	
	public ApiResponse deleteSubject(Long id);
	
	ApiResponse deleteSubjectSoft(Long id);
	
}
