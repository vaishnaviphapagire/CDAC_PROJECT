package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Batch;
import com.app.entity.Quiz;
import com.app.entity.Subject;

public interface QuizDao extends JpaRepository<Quiz, Long> {
	@Query("select q from Quiz q where q.status=:status")
	List<Quiz> findAllQuizByStatus(boolean status);
	
	@Query("select q from Quiz q where q.id=:id and q.status=:status")
	Optional<Quiz> findByIDAndStatus(Long id,boolean status);
	
	@Query("select q from Quiz q left join fetch q.batch b where b.id=:batchId")
	List<Quiz> findAllQuizByBatch(Long batchId);
	
	@Query("select q from Quiz q left join fetch q.subject s where s.id=:subjectId")
	List<Quiz> findAllQuizBySubject(Long subjectId);
}
