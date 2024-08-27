package com.app.dto;

import java.time.LocalDate;
import java.util.Set;

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
public class TeacherProfileDto {
	private byte[] image;
	private String name;
	private String email;
	
	private Designation designation;
}

