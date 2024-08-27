package com.app.entity;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends UserEntity {

	private String helpPhone;
	
	private String helpEmail;

	public Admin(String helpPhone, String helpEmail) {
		super();
		this.helpPhone = helpPhone;
		this.helpEmail = helpEmail;
	}
	
	
	
}
