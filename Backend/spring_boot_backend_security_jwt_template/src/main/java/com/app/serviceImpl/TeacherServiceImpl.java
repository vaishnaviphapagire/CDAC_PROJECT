package com.app.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.SubjectDao;
import com.app.dao.TeacherDao;
import com.app.dto.ApiResponse;
import com.app.dto.StudentProfileDto;
import com.app.dto.TeacherDto;
import com.app.dto.TeacherEditDto;
import com.app.dto.TeacherOutputDto;
import com.app.dto.TeacherProfileDto;
import com.app.entity.Student;
import com.app.entity.Subject;
import com.app.entity.Teacher;
import com.app.service.EmailService;
import com.app.service.ImageHandlingService;
import com.app.service.TeacherService;

@Transactional
@Service
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	TeacherDao teacherDao;
	
	@Autowired
	EmailService emailService;

	@Autowired
	ImageHandlingService imageService;

	@Autowired
	SubjectDao subjecDao;

	@Autowired
	ModelMapper mapper;

	@Override
	public ApiResponse addTeacher(TeacherDto teacher) {

		Teacher t = mapper.map(teacher, Teacher.class);

		Set<Subject> subjects = new HashSet<>();
		for (Long subjectId : teacher.getSubjectId()) {
			Subject sub = subjecDao.findById(subjectId).orElseThrow();
			subjects.add(sub);
		}
		// t.setAddress(teacher.getAddress());
		t.setSubjects(subjects);

		teacherDao.save(t);
		
		LocalDate today = LocalDate.now();
    	LocalTime now = LocalTime.now();
    	String helpMail = "aniketraut1306@gmail.com";
		
		String text = "<!DOCTYPE html>\r\n"
    			+ "<html>\r\n"
    			+ "<head>\r\n"
    			+ "    <meta charset=\"UTF-8\">\r\n"
    			+ "    <title>Email</title>\r\n"
    			+ "    <style>\r\n"
    			+ "        .footer {\r\n"
    			+ "            margin-top: 20px;\r\n"
    			+ "            padding-top: 10px;\r\n"
    			+ "            border-top: 1px solid #ddd;\r\n"
    			+ "            text-align: center;\r\n"
    			+ "            font-size: 12px;\r\n"
//    			+ "            color: #888;\r\n"
    			+ "        }\r\n"
    			+ "        .footer img {\r\n"
    			+ "            max-width: 150px;\r\n"
    			+ "            height: auto;\r\n"
    			+ "        }\r\n"
    			+ "    </style>\r\n"
    			+ "</head>\r\n"
    			+ "<body>\r\n"
    			+ "    <h2>Hello, "+t.getName()+"!</h2>\r\n"
    			+ "    <p> You are registered on TestMatrix portal Successfully...! </p>\r\n"


    			+ "    <p><strong>Username: </strong> "+t.getEmail()+"</p>"
    			+ "    <p><strong>Password: </strong> "+t.getPassword()+"</p>"
//    			+ "    <p><strong>Roll no : </strong> "+stud.getRollNo()+"</p>"
    			+ "    <p><strong>Designaion : </strong> "+t.getDesignation()+"</p>"
    			+ "    <p><strong>Registration Date: </strong> "+today+"</p>\r\n"
    			+ "    <p><strong>Registration Time: </strong> "+now+"</p>\r\n"
    			+ "    <p>If you have any questions or need assistance, feel free to contact us on "+ helpMail +". </p>\r\n"
    			+ "    <p>You can access your account at <a href=\"https://testmatrix.com\">TestMatrix</a>.</p>\r\n"
    			+ "    <p>Best regards,<br>TestMatrix Team</p>\r\n"
    			+ "    \r\n"
    			+ "    <!-- Footer Section -->\r\n"
    			+ "    <div class=\"footer\">\r\n"
    			+ "        <p>© TestMatrix.</p>\r\n"
    			+ "        <img src=\"https://drive.google.com/file/d/11HPIb2vnEWv5pulKyngX7xPnx3cAWspF/view\" alt=\"TestMatrix Logo\"/>\r\n"
    			+ "    </div>\r\n"
    			+ "</body>\r\n"
    			+ "</html>\r\n";
    	
        emailService.sendSimpleMessage(t.getEmail(), "Registration Confirmed At Text Matrix...",text);
		
		return new ApiResponse("Teacher added Successfully.");

	}

	@Override
	public List<Teacher> getAllTeacher() {

		return teacherDao.findAll();
	}

	@Override
	public ApiResponse deleteTeacher(Long id) {
		if (teacherDao.existsById(id)) {
			teacherDao.deleteById(id);
			return new ApiResponse("Teacher Deleted Successfully!");
		}
		return new ApiResponse("Teacher Deletion failed: invalid id");
	}

	@Override
	public TeacherProfileDto getteacherProfileById(Long id) throws IOException {

		Teacher teacher = teacherDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid teacher ID!!!!"));
		TeacherProfileDto dto = new TeacherProfileDto();

		dto.setName(teacher.getName());
		
		dto.setEmail(teacher.getEmail());
		
		dto.setDesignation(teacher.getDesignation());

		dto.setImage(imageService.serveImage(id));

		return dto;
	}

	@Override
	public ApiResponse updateteacher(TeacherEditDto dto) {
		Teacher t1 = teacherDao.findById(dto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Teacher not found for id :" + dto.getId()));

		t1.setName(dto.getName());
		t1.setPassword(dto.getPassword());
		t1.setPhone(dto.getPhone());
		t1.setGender(dto.getGender());
		t1.setAddress(dto.getAddress());
		t1.setDob(dto.getDob());
		t1.setEducation(dto.getEducation());

		teacherDao.save(t1);

		return new ApiResponse("Teacher updated successfully.");
	}
	
	@Override
	public TeacherOutputDto getTeacherById(Long id) {
		
		Teacher teacher =teacherDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
		
		TeacherOutputDto teacherDto = mapper.map(teacher , TeacherOutputDto.class);

	    return teacherDto;
		
		
	}


	

}
