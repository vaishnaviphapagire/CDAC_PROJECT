package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDto {
	
	private int totalCount;
	private int attemptedCount;
	private double avgMarks;
	private int passedCount;
	private int failedCount;
	private int notAttempted;
	

}
