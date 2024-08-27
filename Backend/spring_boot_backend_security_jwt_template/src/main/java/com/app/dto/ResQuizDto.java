package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.app.entity.Batch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResQuizDto extends BaseDto{
	
	private String title;

	private int quizTime;

	private int quizMarks;

	private int passingMarks;

	private SubjectQuizDto subject;

	private boolean status;
	
	private Set<BatchQuizDto> batch = new HashSet<BatchQuizDto>();
	
	//private Set<Batch> batch = new HashSet<Batch>();

	private LocalDate quizScheduleDate;

	private LocalTime quizScheduleTime;

}
