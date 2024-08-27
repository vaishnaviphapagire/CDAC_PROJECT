package com.app.service;

import java.util.List;

import com.app.entity.Event;

public interface EventService {
	
	public List<Event> getAllEvents();
	
	public String addEvent(Event event);
	
	public String editEvent(Event event);
	
	public String deleteEvent(Long id);
	
}
