package com.app.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question extends BaseEntity {

	
	@Lob
    private String question;
	
	
	@Lob
    private String opt1;
	
	@Lob
    private String opt2;
	
	@Lob
    private String opt3;
	
	@Lob
    private String opt4;
	
	
	
    private int correctAns;
	
	
	@ManyToOne(fetch = FetchType.LAZY )
	@JoinColumn(nullable = false)
	private Quiz quiz;

	private int marks=1;

	
	
	
	
	
	
	
}
