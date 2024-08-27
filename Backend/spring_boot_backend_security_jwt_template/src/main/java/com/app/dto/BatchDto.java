package com.app.dto;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BatchDto extends BaseDto{


	@NotEmpty
	private Long id;

//	/

//	@JsonProperty(access = Access.READ_ONLY)
//	private List<Student> studentList = new ArrayList<Student>();
}
