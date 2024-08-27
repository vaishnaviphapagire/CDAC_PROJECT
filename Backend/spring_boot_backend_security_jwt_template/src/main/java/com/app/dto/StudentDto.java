package com.app.dto;


import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.app.entity.Batch;
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
public class StudentDto {

	@Email(message = "Invalid email ...")
	private String email;
	
	@Size(min = 8 , max=25 ,message = "Password Length Should be 8 to 25 characters")
	private String password;
	
	
	private String name;
	
	@Size(min = 10 , max=10 ,message = "Phone Number Should 10 digit only")
	private String phone;
	
	private Gender gender;
	
	private String address;
	
	private LocalDate dob;

	private Role role;
	
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom_seq")
//	@SequenceGenerator(name = "custom_seq", allocationSize = 1, initialValue = 1001)
	@JsonProperty(access = Access.READ_ONLY)
	private Long rollNo;
	
	private Long batchId;
	
	private String guardianName;
	
	private String guardianPhone;
	
	
}
