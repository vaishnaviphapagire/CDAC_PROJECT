package com.app.dto;

import java.util.ArrayList;
import java.util.List;

import com.app.entity.Student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BatchStudentListOutputDto extends BaseDto {
	
	private String batchName;

	private int batchCount;

	private List<Student> studentList = new ArrayList<Student>();

	
}
