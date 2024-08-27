package com.app.service;

import com.app.dto.ApiResponse;
import com.app.entity.Role;
import com.app.entity.TimeTable;

public interface TimeTableService {
	
	ApiResponse addTimeTable(TimeTable timetable);

	TimeTable getTimeTable(Role role);

	ApiResponse deleteTimeTable(Role role);
	
}