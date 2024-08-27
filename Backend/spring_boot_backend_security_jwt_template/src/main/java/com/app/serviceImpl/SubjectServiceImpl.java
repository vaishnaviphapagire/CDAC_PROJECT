package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.SubjectDao;
import com.app.dto.ApiResponse;
import com.app.entity.Subject;
import com.app.service.SubjectService;

@Transactional
@Service

public class SubjectServiceImpl implements SubjectService {
	
	@Autowired
	private SubjectDao subjectDao;

	@Override
	public List<Subject> getAllSubjects() {
		
		return subjectDao.findAll();
	}

	@Override
	public String addSubject(Subject subject) {
		if(subjectDao.save(subject)!=null)
		{
			return "Subject added successfully!";
		}
		
		return "Subject not added";
		
	}

	@Override
	public ApiResponse deleteSubject(Long id) {

		if(subjectDao.existsById(id)) {
			subjectDao.deleteById(id);
			return new ApiResponse("Subject Deleted Successfully!");
		}
		return new ApiResponse("Subject Deletion failed: invalid id");

	}

	@Override
	public ApiResponse deleteSubjectSoft(Long id) {
		Subject subject = subjectDao.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Subject not found"));
		subject.setDeleted(true);
		return new ApiResponse("Subject deleted successfully!!!");
	}


	
}
