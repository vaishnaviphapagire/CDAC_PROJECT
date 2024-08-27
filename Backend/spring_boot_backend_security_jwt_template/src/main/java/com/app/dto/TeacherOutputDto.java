package com.app.dto;

import java.util.HashSet;
import java.util.Set;


import com.app.entity.Designation;
import com.app.entity.Subject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherOutputDto extends UserDto{
	
	private String education;
	private Designation designation;
	private Set<Subject> subjects = new HashSet<Subject>();
		
}

