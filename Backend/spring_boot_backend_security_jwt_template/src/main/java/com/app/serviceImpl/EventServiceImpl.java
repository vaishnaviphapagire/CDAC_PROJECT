package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.EventDao;
import com.app.entity.Event;
import com.app.service.EventService;


@Transactional
@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventDao eventDao;
	
	
	@Override
	public List<Event> getAllEvents() {
		
		return eventDao.findAll() ;
	}

	@Override
	public String addEvent(Event event) {
		if(eventDao.save(event)!=null)
		{
			return "Event added successfully!";
		}
		
		return "Event not added";
	}

	@Override
	public String editEvent(Event event) {
		if(eventDao.existsById(event.getEventId())) {
			eventDao.save(event);
			return "Event edited successfully!";
		}
		return "Event Updation Failed : invalid id !!!!";
	}

	@Override
	public String deleteEvent(Long id) {
		if(eventDao.existsById(id)) {
			eventDao.deleteById(id);
			return "Event deleted Successfully!!";
		}
		return "Event deletion failed: invalid id!!";
	}

}
