package com.app.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BatchDao;
import com.app.dao.StudentDao;
import com.app.dto.ApiResponse;
import com.app.dto.StudentDto;
import com.app.dto.StudentEditDto;
import com.app.dto.StudentOutputDto;
import com.app.dto.StudentProfileDto;
import com.app.entity.Batch;
import com.app.entity.Student;
import com.app.service.EmailService;
import com.app.service.ImageHandlingService;
import com.app.service.StudentService;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

	@Autowired
	StudentDao studentDao;
	
	@Autowired
	EmailService emailService;

	@Autowired
	ImageHandlingService imageService;

	@Autowired
	BatchDao batchDao;

	@Autowired
	ModelMapper mapper;

	@Override
	public ApiResponse addStudent(StudentDto studDto) {

		Student stud = mapper.map(studDto, Student.class);

		Batch batch = batchDao.findById(studDto.getBatchId())
				.orElseThrow(() -> new ResourceNotFoundException("Batch not exist"));

		stud.setBatch(batch);
		batch.getStudentList().add(stud);
		// Holiday holiday = modelMapper.map(holidayDTO, Holiday.class);
		System.out.println(stud.toString());
		studentDao.save(stud);
		
		// email sending code 
		
		String name =stud.getName() ;
    	String pass = stud.getPassword();
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
    			+ "    <h2>Hello, "+name+"!</h2>\r\n"
    			+ "    <p>Thank you for Registration </p>\r\n"


    			+ "    <p><strong>Username: </strong> "+stud.getEmail()+"</p>"
    			+ "    <p><strong>Password: </strong> "+pass+"</p>"
    			+ "    <p><strong>Roll no : </strong> "+stud.getRollNo()+"</p>"
    			+ "    <p><strong>Batch Name : </strong> "+stud.getBatch().getBatchName()+"</p>"
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
    	
        emailService.sendSimpleMessage(stud.getEmail(), "Registration Confirmed At Text Matrix...",text);
		
		return new ApiResponse("Registered Successfully..!");

	}

	@Override
	public StudentOutputDto getStudentById(Long id) {

		Student stud = studentDao.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));

		return mapper.map(stud, StudentOutputDto.class);

	}

	

	@Override
	public ApiResponse updateStudentById(StudentEditDto dto) {

		Student student = studentDao.findById(dto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Student not found for given Id : " + dto.getId()));
		student.setName(dto.getName());
		student.setPhone(dto.getPhone());
		student.setGender(dto.getGender());
		student.setAddress(dto.getAddress());
		student.setDob(dto.getDob());
		student.setGuardianName(dto.getGuardianName());
		student.setGuardianPhone(dto.getGuardianPhone());

		studentDao.save(student);

		return new ApiResponse("Student Updated ...");
	}

	

}
