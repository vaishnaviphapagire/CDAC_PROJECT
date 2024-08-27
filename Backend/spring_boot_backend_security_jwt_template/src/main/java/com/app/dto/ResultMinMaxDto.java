package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultMinMaxDto {

	private Long quiz_id;
	private String title;
	private Long min; // Use Integer
	private Long max; // Use Integer
	private int obtained_marks; // Use Integer

}
