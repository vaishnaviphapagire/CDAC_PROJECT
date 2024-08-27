package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetQuizByStudentIdDto {

	private Long id ;
	
	private String title ;
	
	private int passingMarks;
	
	private String remark;
	
//	private String subjeact;
	
	
}
