package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Role;
import com.app.entity.TimeTable;

import com.app.serviceImpl.TimeTableServiceImpl;


@CrossOrigin
@RestController
@RequestMapping("/timeTable")
public class TimeTableController {
	@Autowired
	TimeTableServiceImpl timeService;

	@PostMapping("/add")
	ResponseEntity<?> addTimeTable(@RequestBody TimeTable timeTable) {
		return ResponseEntity.status(HttpStatus.CREATED).body(timeService.addTimeTable(timeTable));
	}

	@GetMapping("/view/{role}")
	ResponseEntity<?> getTimeTable(@PathVariable Role role) {
		return ResponseEntity.ok(timeService.getTimeTable(role));
	}

	@DeleteMapping("/delete/{role}")
	ResponseEntity<?> deleteTimeTableByRole(@PathVariable Role role) {
		return ResponseEntity.ok(timeService.deleteTimeTable(role));
	}
}
