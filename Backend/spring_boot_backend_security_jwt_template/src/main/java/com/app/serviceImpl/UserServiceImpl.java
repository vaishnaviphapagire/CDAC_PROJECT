package com.app.serviceImpl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.LoginInputDto;
import com.app.dto.LoginOutPutDto;
import com.app.dto.StudentOutputDto;
import com.app.dto.StudentProfileDto;
import com.app.entity.Student;
import com.app.entity.UserEntity;
import com.app.service.ImageHandlingService;
import com.app.service.StudentService;
import com.app.service.UserService;

@Transactional
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	ImageHandlingService imageService;
	
	@Autowired
	StudentService studService;

	@Override
	public LoginOutPutDto loginUser(LoginInputDto input) {
		try {
			LoginOutPutDto dto = new LoginOutPutDto();
			UserEntity u =  userDao.findByEmailAndPasswordAndRole(input.getEmail(), input.getPassword(), input.getRole()).orElseThrow();
			if(u != null) {
				
				dto.setLoginId(u.getId());
				dto.setLoginName(u.getName());
				dto.setLoginRole(u.getRole().toString());
				dto.setLoginEmail(u.getEmail());
				
				if(dto.getLoginRole() == "STUDENT") {
					StudentOutputDto studDto=studService.getStudentById(dto.getLoginId());
					
					dto.setBatchName(studDto.getBatch().getBatchName());
					dto.setBatchId(studDto.getBatch().getId());
					
					
				}else {
					
					dto.setBatchName(null);
					dto.setBatchId(null);
					
					
				}
				return dto;
			}else {
				return null;
			}
		}catch(RuntimeException e) {
			throw new RuntimeException("Invalid Credential");
		}
		
		
	}

	@Override
	public StudentProfileDto getStudentProfileById(Long id) throws IOException {
		UserEntity user = userDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Student ID!!!!"));
		StudentProfileDto dto = new StudentProfileDto();
		if(dto != null) {
			dto.setImage(imageService.serveImage(id));
		}else {
			dto = null;
		}
		
		
		return dto;
	}
	
	
	

}
