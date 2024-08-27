package com.app.dto;



import com.app.entity.StudQuizId;

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
public class ResResultDto {
	
	private StudQuizId sqId;

	private int obtainedMarks;
}
