package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.entity.Announcement;

public interface AnnouncementService {
	
	List<Announcement> getAllAnnouncement();
	
	ApiResponse addAnnouncement(Announcement announcement);
	
	ApiResponse editAnnouncement(Announcement announcement);
	
	ApiResponse deleteAnnouncement(Long id);
}
