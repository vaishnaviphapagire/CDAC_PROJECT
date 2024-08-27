package com.app.dto;

import com.app.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginInputDto {

	private String email;
	
	private String password;
	
	private Role role; 
	
}
