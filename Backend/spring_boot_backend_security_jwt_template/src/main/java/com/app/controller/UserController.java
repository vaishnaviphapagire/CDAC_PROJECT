package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.LoginInputDto;
import com.app.dto.LoginOutPutDto;
import com.app.service.ImageHandlingService;
import com.app.service.StudentService;
import com.app.service.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	
	@Autowired
	UserService userService;
	
//	@Autowired
//	StudentService studService;
	
	@Autowired
	ImageHandlingService imageService;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody LoginInputDto input){
		
		try {
			LoginOutPutDto out= userService.loginUser(input);
			
			
			if(out != null) {
				return ResponseEntity.ok(out);
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials");
			
		}catch(RuntimeException e) {
			System.out.println("In controller catch block");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}		
		
		 
	}
	
	
	@PostMapping(value = "/images/{id}",
			consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable 
			Long id, 
			@RequestParam MultipartFile image)
			throws IOException {
		System.out.println("in upload image " + id);
		return ResponseEntity.status(HttpStatus.CREATED).
				body(imageService.uploadImage(id, image));
	}
	
	
	@GetMapping("/getProfileById/{id}")
	public ResponseEntity<?> getProfileById(@PathVariable Long id){
		try {
			return ResponseEntity.ok(userService.getStudentProfileById(id));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image not get somethid is wrong");
			
		}
	}
	
	
//	@GetMapping(value = "/images/{id}",
//			consumes = "multipart/form-data")
//	public ResponseEntity<?> uploadImage(@PathVariable 
//			Long id, 
//			@RequestParam MultipartFile image)
//			throws IOException {
//		System.out.println("in upload image " + id);
//		return ResponseEntity.status(HttpStatus.CREATED).
//				body(imageService.uploadImage(id, image));
//	}
//	

}
