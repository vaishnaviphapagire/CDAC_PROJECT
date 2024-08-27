package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.app.entity.Gender;
import com.app.entity.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentEditDto {
	
	private Long id;
	
	private String name;
	
	@Length(min = 8, max = 25, message = "Password length must be 8 to 25 characters...")
	private String password;

	@Size(max=10,min=10,message="enter 10 digit mobile number")
	@Pattern(regexp = "^[0-9]{10}$",message = "enter 10 digit mobile number") 
	private String phone;
	
	private Gender gender;
	
	private String address;
	
	private LocalDate dob;

//	private Role role;
	
//	private Long batchId;
	
	private String guardianName;
	
	private String guardianPhone;
}
