package com.app.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Teacher extends UserEntity {

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private Designation designation;


	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "teacher_subject", joinColumns = @JoinColumn(name = "techId"), inverseJoinColumns = @JoinColumn(name = "subId"))
	private Set<Subject> subjects = new HashSet<Subject>();
	
	@Column(nullable = false)
	private String education;

	public Teacher(Designation designation, Set<Subject> subjects, String education) {
		super();
		this.designation = designation;
		this.subjects = subjects;
		this.education = education;
	}
	
	
	
	
	
	
	

}
