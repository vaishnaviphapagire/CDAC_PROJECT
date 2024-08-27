package com.app.serviceImpl;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.HolidayDao;
import com.app.entity.Holiday;
import com.app.service.HolidayService;

@Transactional
@Service
public class HolidayServiceImpl implements HolidayService {
	
	@Autowired
	HolidayDao holidayDao;

	@Override
	public List<Holiday> getAllHolidays() {
		
		return holidayDao.findAll();
	}

	@Override
	public String addHoliday(Holiday holiday) {
		
		try {
			holidayDao.save(holiday);
				return "Holiday added successfully...";
			
			
		}catch(RuntimeException e) {
			throw new RuntimeException("Holiday Not added (Somethis is wrong)");
		}
		
		
	}

	@Override
	public Holiday editHoliday(Holiday holiday) {
		if(holidayDao.existsById(holiday.getHoildayId())) {
			return holidayDao.save(holiday);
		}
		return null;
	}

	@Override
	public String deleteHolidayById(Long id) {
		if(holidayDao.existsById(id)) {
			holidayDao.deleteById(id);
			return "Holiday deleted successfully";
		}
		
		return "Holiday Id Does Not Exist	...";
	}

}
