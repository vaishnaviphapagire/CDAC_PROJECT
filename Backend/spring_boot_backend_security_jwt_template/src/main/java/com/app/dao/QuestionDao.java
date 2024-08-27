package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Question;
import com.app.entity.Quiz;

public interface QuestionDao extends JpaRepository<Question, Long> {

	List<Question> findByQuiz(Quiz quiz);
	
	@Modifying
	@Query("delete from Question q where q.quiz=:quiz")
	void deleteByQuizId(Quiz quiz);
}
