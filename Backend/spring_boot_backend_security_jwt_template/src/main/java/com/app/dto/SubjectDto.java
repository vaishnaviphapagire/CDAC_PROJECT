package com.app.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SubjectDto{
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long subId;
	
	@NotNull
	private String subName;
	
	@JsonProperty(access = Access.READ_ONLY)
	private boolean isDeleted;
}
