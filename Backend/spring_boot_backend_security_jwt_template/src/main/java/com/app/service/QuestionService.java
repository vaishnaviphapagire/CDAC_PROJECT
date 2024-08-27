package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.ReqQuestionDto;
import com.app.dto.ResQuestionDto;
import com.app.entity.Question;

public interface QuestionService {
	ApiResponse addQuestion(ReqQuestionDto questionDto);

	ResQuestionDto editViewQuestion(Long qid);

	ApiResponse editQuestion(ResQuestionDto questionDto, Long qid);

	ApiResponse deleteQuestion(Long qid);
	
	List<ResQuestionDto> getQuestionList(Long quizId);
}
