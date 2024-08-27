package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AnnouncementDao;
import com.app.dto.ApiResponse;
import com.app.entity.Announcement;
import com.app.service.AnnouncementService;

@Transactional
@Service
public class AnnouncementServiceImpl implements AnnouncementService {

	@Autowired
	AnnouncementDao announcementDao;
	@Override
	public List<Announcement> getAllAnnouncement() {
		
		return announcementDao.findAll();
	}

	@Override
	public ApiResponse addAnnouncement(Announcement announcement) {
		Announcement newAnnouncement = announcementDao.save(announcement);
		if(newAnnouncement !=null) {
			return new ApiResponse("Announcement added successfully!");
		}
		return new ApiResponse("Announcement not added");
	}

	@Override
	public ApiResponse editAnnouncement(Announcement announcement) {
		if(announcementDao.existsById(announcement.getAnnouncementId())) {
			announcementDao.save(announcement);
			return new ApiResponse("Announcement edited successfully");
		}
		return new ApiResponse("Announcement Updation Failed : invalid id !!!!");
	}

	@Override
	public ApiResponse deleteAnnouncement(Long id) {
		if(announcementDao.existsById(id)) {
			announcementDao.deleteById(id);
			return new ApiResponse("Announcement deleted Successfully!!");
		}
		return new ApiResponse ("Announcement deletion failed: invalid id!!");
	}

}
