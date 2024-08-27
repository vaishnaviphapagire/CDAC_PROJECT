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
public class Event{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long eventId;
	
	@Column(length=30,nullable= false)
	private String eventTitle;
	
	@Column (length=150, nullable=false)
	private String eventDesc;
	
	@Column (nullable=false)
	private LocalDate eventFrom;
	
	@Column (nullable=false)
	private LocalDate eventTo;
	
	
}
