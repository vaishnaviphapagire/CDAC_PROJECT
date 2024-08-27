package com.app.dto;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.app.entity.Quiz;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class ReqQuestionDto extends BaseDto {

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

	@NotNull
	private Long quizId;

	@JsonProperty(access = Access.READ_ONLY)
	private int marks =1;
	
}
