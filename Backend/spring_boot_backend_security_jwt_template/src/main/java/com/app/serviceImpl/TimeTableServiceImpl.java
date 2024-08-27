package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.TimeTableDao;
import com.app.dto.ApiResponse;
import com.app.entity.Role;
import com.app.entity.TimeTable;
import com.app.service.TimeTableService;

@Service
@Transactional
public class TimeTableServiceImpl implements TimeTableService {
	@Autowired
	TimeTableDao timeDao;

	@Override
	public ApiResponse addTimeTable(TimeTable timeTable) {
		TimeTable existingTimeTable = timeDao.findByRole(timeTable.getRole());
//				.orElseThrow(() -> new ResourceNotFoundException("TimeTable not found!"));
		if (existingTimeTable != null) {
			existingTimeTable.getTimeSlot().clear();
			timeDao.delete(existingTimeTable);
		}
		timeDao.save(timeTable);
		return new ApiResponse("Timetable created successfully!");
	}

	@Override
	public TimeTable getTimeTable(Role role) {
		TimeTable existingTimeTable = timeDao.findByRole(role);
//				.orElseThrow(() -> new ResourceNotFoundException("TimeTable not found!"));
		return existingTimeTable;
	}

	@Override
	public ApiResponse deleteTimeTable(Role role) {
		TimeTable existingTimeTable = timeDao.findByRole(role);
//				.orElseThrow(() -> new ResourceNotFoundException("TimeTable not found!"));
		if (existingTimeTable != null) {
			existingTimeTable.getTimeSlot().clear();
			timeDao.delete(existingTimeTable);
		}
		return new ApiResponse("Timetable deleted successfully!");
	}

}
