package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Batch;

public interface BatchDao extends JpaRepository<Batch, Long>{

	@Query("select b from Batch b left join fetch b.studentList where b.id=:batchId ")
	Batch getStudentsByBatch(Long batchId);
}
