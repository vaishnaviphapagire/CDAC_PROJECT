package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.ResQuizDto;
import com.app.dto.ResReqQuizDto;
import com.app.dto.SheduleQuizDto;
import com.app.entity.Batch;
import com.app.entity.Quiz;

public interface QuizService {
	
	Long addQuiz(ResReqQuizDto quizdto);
	ApiResponse editQuiz();
	ApiResponse deleteQuiz(Long quizId);
	List<ResQuizDto> getAllQuiz();
	List<ResQuizDto> getScheduledQuiz();
	List<ResQuizDto> getCompletedQuiz();
	ApiResponse scheduleQuizTimeAndDate(SheduleQuizDto sheduledQuizDto,Long id);
	List<ResQuizDto> getAllQuizByBatch(Long batchId);
	List<ResQuizDto> getAllQuizBySubject(Long subjectId);
	ResQuizDto getQuizById(Long quizId);
	
}
