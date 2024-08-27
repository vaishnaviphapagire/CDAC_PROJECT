package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entity.UserEntity;

public interface ImageHandlingService {
	
	ApiResponse uploadImage(Long id, MultipartFile image) throws IOException;
	
	byte[] serveImage(Long id) throws IOException;
	
	
	//used for uploading img along with emp details
	void uploadImage(UserEntity user, MultipartFile image) throws IOException;
	
}


