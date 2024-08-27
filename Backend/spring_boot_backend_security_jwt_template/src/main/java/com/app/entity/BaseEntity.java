package com.app.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@CreationTimestamp
	private LocalDateTime createdTime;

	@UpdateTimestamp
	private LocalDateTime updatedTime;

	@Column
	private boolean isDeleted=false;

	public BaseEntity(Long id, LocalDateTime createdTime, LocalDateTime updatedTime, boolean isDeleted) {
		super();
		this.id = id;
		this.createdTime = createdTime;
		this.updatedTime = updatedTime;
		this.isDeleted = isDeleted;
	}

}
