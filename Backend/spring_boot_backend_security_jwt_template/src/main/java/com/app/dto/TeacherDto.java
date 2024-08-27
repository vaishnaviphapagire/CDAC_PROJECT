package com.app.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.app.entity.Designation;
import com.app.entity.Gender;
import com.app.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDto{
	
	@NotEmpty( message = "Email can't be blank...")
	@Email(message = "Invalid email format...")
	private String email;	
	
	@NotEmpty(message = "Password can't be empty...")
	@Length(min = 8, max = 25, message = "Password length must be 8 to 25 characters...")
	private String password;
		
	@NotEmpty(message = "Name can't be empty...")
	private String name;
	
	
	@Size(max=10,min=10,message="enter 10 digit mobile number")
	@Pattern(regexp = "^[0-9]{10}$",message = "enter 10 digit mobile number") 
	private String phone;
	
	@NotNull
	private Gender gender;
	
	@NotEmpty(message = "Address can't be empty...")
	@Length(max = 250 )
	private String address;
	
	@NotNull
	private LocalDate dob;
	
	@NotNull
	private Role role;
	
	@NotNull
	private Designation designation;
	
	@NotNull
	private String education;
	
	@NotNull
	private Set<Long> subjectId = new HashSet<>();

}
