package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.TeacherDto;
import com.app.dto.TeacherEditDto;
import com.app.service.TeacherService;

@CrossOrigin
@RestController
@RequestMapping("/teacher")
public class TeacherControler {

	@Autowired
	TeacherService teacherService;
	
	@PostMapping("/addTeacher")
	public ResponseEntity<?> addTecher(@RequestBody TeacherDto teacherDto){
		return ResponseEntity.ok(teacherService.addTeacher(teacherDto));
	}
	
	@GetMapping("/getAllTeacher")
	public ResponseEntity<?> getAllTeacher(){
		return ResponseEntity.ok(teacherService.getAllTeacher());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTeacher(@PathVariable Long id){
		return ResponseEntity.ok(teacherService.deleteTeacher(id));
	}
	
	@PutMapping("/editTeacher")
	public ResponseEntity<?> editTeacher(@RequestBody TeacherEditDto dto){
		return ResponseEntity.ok(teacherService.updateteacher(dto));
	}
	
	@GetMapping("/getTeacherById/{id}")
	public ResponseEntity<?> getTeacherById(@PathVariable Long id){

		return ResponseEntity.ok(teacherService.getTeacherById(id));
	}

}

