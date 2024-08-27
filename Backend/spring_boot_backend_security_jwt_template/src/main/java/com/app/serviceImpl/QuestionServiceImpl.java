package com.app.serviceImpl;

import java.util.LinkedList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.QuestionDao;
import com.app.dao.QuizDao;
import com.app.dto.ApiResponse;
import com.app.dto.ReqQuestionDto;
import com.app.dto.ResQuestionDto;
import com.app.entity.Question;
import com.app.entity.Quiz;
import com.app.service.QuestionService;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	QuestionDao questionDao;

	@Autowired
	QuizDao quizDao;

	@Autowired
	ModelMapper model;
	

	@Override
	public ApiResponse addQuestion(ReqQuestionDto questionDto) {
		System.out.println("Inside Question Service"+ questionDto.toString());
		Quiz quiz = quizDao.findById(questionDto.getQuizId())				
				.orElseThrow(() -> new ResourceNotFoundException("Quiz id not found"));
		System.out.println("Quiz "+ quiz.toString());
		Question question = model.map(questionDto,Question.class);
		question.setQuiz(quiz);
		questionDao.save(question);
		return new ApiResponse("Question added successfully");
	}

	@Override
	public ResQuestionDto editViewQuestion(Long qid) {
	Question quest = questionDao.findById(qid)
			.orElseThrow(() -> new ResourceNotFoundException("Question id not found"));
	
		return model.map(quest, ResQuestionDto.class);
	}

	@Override
	public ApiResponse editQuestion(ResQuestionDto questionDto, Long questionId) {
		Question quest = questionDao.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question id not found"));
		questionDto.setId(questionId);
		Question question = model.map(questionDto,Question.class);
		question.setQuiz(quest.getQuiz());
		question.setCreatedTime(quest.getCreatedTime());
		System.out.println(question.toString());
		questionDao.save(question);
		return new ApiResponse("Question updated successfully");
	}

	@Override
	public ApiResponse deleteQuestion(Long qid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ResQuestionDto> getQuestionList(Long quizId) {
		Quiz quiz = quizDao.findById(quizId)				
				.orElseThrow(() -> new ResourceNotFoundException("Quiz id not found"));
		
		List<Question> questionList = questionDao.findByQuiz(quiz);
		List<ResQuestionDto> resQuest = new LinkedList<ResQuestionDto>();
		for(Question q : questionList) {
			resQuest.add(model.map(q, ResQuestionDto.class));
		}
		return resQuest;
		
	}

}
