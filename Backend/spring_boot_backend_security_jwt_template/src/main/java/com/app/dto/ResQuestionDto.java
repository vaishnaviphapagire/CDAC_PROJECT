package com.app.dto;

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
public class ResQuestionDto extends BaseDto {
	@NotNull(message = "Question cannot be empty")
    private String question;
	
	@NotNull(message = "Enter 4 options ")
    private String opt1;
	
	@NotNull(message = "Enter 4 options ")
    private String opt2;
	
	@NotNull(message = "Enter 4 options ")
    private String opt3;
	
	@NotNull(message = "Enter 4 options ")
    private String opt4;	
	
	@NotNull(message = "Enter correct option")
    private int correctAns;
	
}
