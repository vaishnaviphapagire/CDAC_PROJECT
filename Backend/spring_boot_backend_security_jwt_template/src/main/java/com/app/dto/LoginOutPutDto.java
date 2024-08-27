package com.app.dto;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.entity.Designation;
import com.app.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginOutPutDto {
	
	private Long loginId;
	
	private String loginName;
	
	private String loginRole;
	
	private String batchName;
	
	private Long batchId;
	
	private String loginEmail;
	
	@Enumerated(EnumType.STRING)
	private Designation designation;
	
	

}
