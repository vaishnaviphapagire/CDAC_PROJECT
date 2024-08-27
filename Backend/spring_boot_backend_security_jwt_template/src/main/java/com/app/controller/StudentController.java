package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.StudentDto;
import com.app.dto.StudentEditDto;
import com.app.service.StudentService;

@CrossOrigin
@RestController
@RequestMapping("/student")
public class StudentController {
	
	@Autowired
	StudentService studService;

	@PostMapping("/add")
	public ResponseEntity<?> addStudent(@RequestBody StudentDto stud) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(studService.addStudent(stud));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials");
		}
		
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<?> getStudentById(@PathVariable Long id){
		return ResponseEntity.ok(studService.getStudentById(id));
	}
	
//	@GetMapping("/getProfileById/{id}")
//	public ResponseEntity<?> getProfileById(@PathVariable Long id){
//		try {
//			return ResponseEntity.ok(studService.getStudentProfileById(id));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image not get somethid is wrong");
//			
//		}
//	}
	
	@PutMapping("/editStudent")
	public ResponseEntity<?> editStudent(@RequestBody StudentEditDto dto){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(studService.updateStudentById(dto));
	}
}
