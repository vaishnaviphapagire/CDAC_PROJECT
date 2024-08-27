package com.app.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Batch extends BaseEntity {

	private String batchName;

	private int batchCount;

	@OneToMany(mappedBy = "batch", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
//	@JsonManagedReference
	private List<Student> studentList = new ArrayList<Student>();

	public void addStudent(Student stud) {
		this.studentList.add(stud);
		stud.setBatch(this);
	}

	public void removeStudent(Student stud) {
		this.studentList.remove(stud);
//		stud.setBatch(null);
	}

}
