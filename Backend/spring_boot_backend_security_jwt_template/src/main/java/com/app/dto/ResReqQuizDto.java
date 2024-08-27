package com.app.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResReqQuizDto extends BaseDto{
	
	@NotNull(message = "Title cannot be empty")
	private String title;

	@NotNull(message = "Quiz time cannot be empty")
	private int quizTime;
	
	@NotNull(message = "Marks cannot be null")
	@Min(10)
	private int quizMarks;
	
	@NotNull(message = "Passing marks cannot be null")
	@Min(4)
	private int passingMarks;
	
	@NotNull(message = "Subject Id cannot be empty")
	private Long subjectId;
	
	@NotNull
	private Long batchId[]= {};	
}
