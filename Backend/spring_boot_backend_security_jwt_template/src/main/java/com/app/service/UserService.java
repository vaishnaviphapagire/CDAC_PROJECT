package com.app.service;

import java.io.IOException;

import com.app.dto.LoginInputDto;
import com.app.dto.LoginOutPutDto;
import com.app.dto.StudentProfileDto;

public interface UserService {
	
	public LoginOutPutDto loginUser(LoginInputDto input);
	
	public StudentProfileDto getStudentProfileById(Long id) throws IOException;

}
