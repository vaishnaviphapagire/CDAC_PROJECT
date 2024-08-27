package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse {

	private String msg;

	public ApiResponse(String msg) {
		super();
		this.msg = msg;
	}
	
	
	
}
