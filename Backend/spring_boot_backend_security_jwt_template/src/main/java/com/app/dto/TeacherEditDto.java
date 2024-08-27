package com.app.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.app.entity.Designation;
import com.app.entity.Gender;
import com.app.entity.Subject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherEditDto {

	@NotNull(message = "Teacher Id is empty..")
	private Long id ;
	
	@NotEmpty(message = "Name can't be empty...")
	private String name;
	
	@Length(min = 8, max = 25, message = "Password length must be 8 to 25 characters...")
	private String password;
	
	@Size(max=10,min=10,message="enter 10 digit mobile number")
	@Pattern(regexp = "^[0-9]{10}$",message = "enter 10 digit mobile number") 
	private String phone;
	
	@NotEmpty(message = "Gender is Not selected..")
	private Gender gender;
	
	@NotEmpty(message = "Address can't be empty...")
	@Length(max = 250 )
	private String address;
	
	@NotNull(message = "Date of Birth is empty..")
	private LocalDate dob;
	
	
	@NotNull(message = "Education is empty..")
	private String education;
	
	
	
	
	
	

}
