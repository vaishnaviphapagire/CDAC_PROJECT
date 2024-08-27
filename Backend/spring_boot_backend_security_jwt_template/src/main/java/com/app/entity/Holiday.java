package com.app.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Holiday{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hoildayId;
	
	@Column(length = 30 , nullable = false)
	private String holidayTitle;
	
	@Column(nullable = false)
	private LocalDate holidayFrom;
	
	@Column(nullable = false)
	private LocalDate holidayTo;

}

