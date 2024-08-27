package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SheduleQuizDto {
	
//	@NotNull(message = "Enter valid id")
//	private Long id;
	
	@NotNull(message = "Enter valid date")

	private LocalDate quizScheduleDate;

	@NotNull(message = "Enter valid time")
	private LocalTime quizScheduleTime;
}