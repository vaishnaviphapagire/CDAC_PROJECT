package com.app.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class BaseDto {

	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime createdTime;

	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedTime;
	
	@JsonProperty(access = Access.READ_ONLY)
	private boolean isDeleted;

	
}
