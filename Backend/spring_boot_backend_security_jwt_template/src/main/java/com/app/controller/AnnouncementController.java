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

import com.app.dto.ApiResponse;
import com.app.entity.Announcement;
import com.app.entity.Event;
import com.app.service.AnnouncementService;

@CrossOrigin
@RestController
@RequestMapping("/announcement")
public class AnnouncementController {
	@Autowired
	AnnouncementService announcementService;
	
	@GetMapping("/getAllAnnouncement")
	public ResponseEntity<?> getAllAnnouncement(){
		
		return ResponseEntity.ok(announcementService.getAllAnnouncement());
		
	}
	
	@PostMapping("/addAnnouncement")
	public ResponseEntity<?> addAnnouncement(@RequestBody Announcement announcement){
		try {
			ApiResponse str = announcementService.addAnnouncement(announcement);
			return ResponseEntity.status(HttpStatus.CREATED).body(str);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Announcement not added");
		}
	}
	
	
	@PutMapping("/editAnnouncement")
	public ResponseEntity<?> editAnnouncement(@RequestBody Announcement announcement){
		return ResponseEntity.ok(announcementService.editAnnouncement(announcement));
	}
	
	@DeleteMapping("/{announcementId}")
	
	public ResponseEntity<?> deleteAnnouncement(@PathVariable Long announcementId){
			return ResponseEntity.ok(announcementService.deleteAnnouncement(announcementId));
		}
	
	
	
}
