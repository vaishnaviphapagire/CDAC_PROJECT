package com.app.serviceImpl;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exception.ApiException;
import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.ApiResponse;
import com.app.entity.UserEntity;
import com.app.service.ImageHandlingService;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {

	@Value("${file.upload.location}") 
	
	private String uploadFolder;

	@Autowired
	private UserDao userDao;

	@PostConstruct
	public void init() throws IOException {
		
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse uploadImage(Long id, MultipartFile image) throws IOException {
		
		UserEntity user = userDao.
				findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
		
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		
		writeByteArrayToFile(new File(path), image.getBytes());
		
		user.setImagePath(path);
		
		return new ApiResponse("Image file uploaded successfully for User id " + id);
	}

	@Override
	public void uploadImage(UserEntity user, MultipartFile image) throws IOException {
		
		String path = uploadFolder.concat(image.getOriginalFilename());
		
		System.out.println(path);
	
		writeByteArrayToFile(new File(path), image.getBytes());
		
		user.setImagePath(path);
		
		
		System.out.println("Image file uploaded successfully for User " + user.getName());
	}

	@Override
	public byte[] serveImage(Long id) throws IOException {
		
		UserEntity user = userDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!"));
		
		String path = user.getImagePath();
		if (path != null) {
			
			return readFileToByteArray(new File(path));
			
		} else
			return null;

	}

	
	


}
