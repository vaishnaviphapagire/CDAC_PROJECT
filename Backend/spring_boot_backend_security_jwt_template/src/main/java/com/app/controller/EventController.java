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

import com.app.entity.Event;
import com.app.service.EventService;



@CrossOrigin
@RestController
@RequestMapping("/event")

public class EventController {
	
	@Autowired
	EventService eventService;
	
	@GetMapping("/getAllEvent")
	public ResponseEntity<?> getAllEvents(){
		
		return ResponseEntity.ok(eventService.getAllEvents());
		
	}
	
	@PostMapping("/addEvent")
	public ResponseEntity<?> addEvent(@RequestBody Event event){
		try {
			String str = eventService.addEvent(event);
			return ResponseEntity.status(HttpStatus.CREATED).body(str);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Event not added");
		}
	}
	
	
	@PutMapping("/editEvent")
	public ResponseEntity<?> editEvent(@RequestBody Event event){
		return ResponseEntity.ok(eventService.editEvent(event));
	}
	
	@DeleteMapping("/{eventId}")
	
	public ResponseEntity<?> deleteEvent(@PathVariable Long eventId){
			return ResponseEntity.ok(eventService.deleteEvent(eventId));
		}
	

}
