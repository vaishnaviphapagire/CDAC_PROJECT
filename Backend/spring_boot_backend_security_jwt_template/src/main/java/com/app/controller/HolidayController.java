package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.entity.Holiday;
import com.app.service.HolidayService;

@CrossOrigin
@RestController
@RequestMapping("/holiday")
public class HolidayController {
	
	@Autowired
	HolidayService holidayService;
	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllHoliday(){
		return ResponseEntity.ok(holidayService.getAllHolidays());
	}
	
	@PostMapping("/addHoliday")
	public ResponseEntity<?> addHoliday(@RequestBody Holiday holiday){
		try {
			String str = holidayService.addHoliday(holiday);
			return ResponseEntity.status(HttpStatus.CREATED).body(str);
		}catch(RuntimeException e) {
			
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Holiday Not added");
			
		}
	}
	
	@PutMapping("/editHoliday")
	public ResponseEntity<?> editHoiday(@RequestBody Holiday holiday){
		
		if(holidayService.editHoliday(holiday) != null) {
			return ResponseEntity.ok("Holiday Updated");
		}
		
		return ResponseEntity.ok("Your Id not exist...");
	}
	
	@DeleteMapping("/deleteHolidayById/{id}")
	public ResponseEntity<?> deleteHoliday(@PathVariable Long id){
		return ResponseEntity.ok(holidayService.deleteHolidayById(id));
	}

}
