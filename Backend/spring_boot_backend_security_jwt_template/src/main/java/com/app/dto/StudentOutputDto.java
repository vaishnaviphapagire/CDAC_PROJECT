package com.app.dto;

import com.app.entity.Batch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentOutputDto extends UserDto {

	private Long rollNo;

	private Batch batch;

	private String guardianName;

	private String guardianPhone;

}
