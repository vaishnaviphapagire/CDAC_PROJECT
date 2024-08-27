package com.app.service;

import java.util.List;

import com.app.entity.Holiday;

public interface HolidayService {
	
	public List<Holiday> getAllHolidays();
	
	public String addHoliday(Holiday holiday);
	
	public Holiday editHoliday(Holiday holiday);
	
	public String deleteHolidayById(Long id);
	
}
