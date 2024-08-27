package com.app.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long subId;
	
	@Column(length = 20 ,nullable = false)
	private String subName;
	
	@Column(columnDefinition = "tinyint(1) default 0")
	private boolean isDeleted;

	public Subject(Long subId, String subName, boolean isDeleted) {
		super();
		this.subId = subId;
		this.subName = subName;
		this.isDeleted = isDeleted;
	}
	
	
	
	
}
