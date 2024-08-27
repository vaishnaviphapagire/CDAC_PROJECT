package com.app.service;

import java.util.List;

import com.app.dto.GetQuizByStudentIdDto;
import com.app.dto.QuizResultDto;
import com.app.dto.ReqResultDto;
import com.app.dto.ResultMinMaxDto;
import com.app.entity.Result;
import com.app.entity.StudQuizId;

public interface ResultService {
	Result generateResult(ReqResultDto resultDto);

	QuizResultDto quizWiseResult(Long id);
	
	List<ResultMinMaxDto> getMinMax(Long id);
	
	Result resultQuizAnalysis(StudQuizId  sqId);
	
	List<GetQuizByStudentIdDto> getQuizByStud(Long id);

}
