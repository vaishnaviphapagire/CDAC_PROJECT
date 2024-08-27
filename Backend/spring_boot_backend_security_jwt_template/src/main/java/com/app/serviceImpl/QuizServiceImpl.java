package com.app.serviceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BatchDao;
import com.app.dao.QuestionDao;
import com.app.dao.QuizDao;
import com.app.dao.SubjectDao;
import com.app.dto.ApiResponse;
import com.app.dto.BatchQuizDto;
import com.app.dto.ResQuizDto;
import com.app.dto.ResReqQuizDto;
import com.app.dto.SheduleQuizDto;
//import com.app.dto.SubjectDto;
import com.app.entity.Batch;
import com.app.entity.Question;
import com.app.entity.Quiz;
import com.app.entity.Subject;
import com.app.service.QuizService;

@Service
@Transactional
public class QuizServiceImpl implements QuizService {
	@Autowired
	QuizDao quizDao;

	@Autowired
	BatchDao batchDao;

	@Autowired
	SubjectDao subjectDao;

	@Autowired
	ModelMapper model;

	@Autowired
	QuestionDao questionDao;

	@Override
	public Long addQuiz(ResReqQuizDto quizdto) {
		Long batchId[] = quizdto.getBatchId();

		Quiz quiz = model.map(quizdto, Quiz.class);
		Subject subject = subjectDao.findById(quizdto.getSubjectId())
				.orElseThrow(() -> new ResourceNotFoundException("Batch of given Id not found!"));
		quiz.setSubject(subject);

		for (Long batchid : batchId) {
			Batch batch = batchDao.findById(batchid)
					.orElseThrow(() -> new ResourceNotFoundException("Batch of given Id not found!"));
//			 quiz.addBatch(batch);
			quiz.getBatch().add(batch);
		}
		Quiz q1 = quizDao.save(quiz);

			return q1.getId();
//		return new ApiResponse("Quiz added successfully");
	}

	@Override
	public ApiResponse editQuiz() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ApiResponse deleteQuiz(Long quizId) {
		Quiz quiz = quizDao.findByIDAndStatus(quizId, true)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found!"));
		questionDao.deleteByQuizId(quiz);
		quizDao.delete(quiz);
		return new ApiResponse("Quiz deleted successfully");
	}

	@Override
	public List<ResQuizDto> getAllQuiz() {
		List<Quiz> quizList = quizDao.findAll();

		List<ResQuizDto> quizDtoList = new ArrayList<>();

		for (Quiz q : quizList) {
			ResQuizDto resQuiz = model.map(q, ResQuizDto.class);

			quizDtoList.add(resQuiz);
		}
		return quizDtoList;
	}

	@Override
	public List<ResQuizDto> getScheduledQuiz() {
		List<Quiz> quizList = quizDao.findAllQuizByStatus(true);

		List<ResQuizDto> quizDtoList = new ArrayList<>();

		for (Quiz q : quizList) {
			ResQuizDto resQuiz = model.map(q, ResQuizDto.class);

			quizDtoList.add(resQuiz);
		}
		return quizDtoList;

	}

	@Override
	public List<ResQuizDto> getCompletedQuiz() {
		List<Quiz> quizList = quizDao.findAllQuizByStatus(false);
		List<ResQuizDto> quizDtoList = new ArrayList<>();

		for (Quiz q : quizList) {
			ResQuizDto resQuiz = model.map(q, ResQuizDto.class);

			quizDtoList.add(resQuiz);
		}
		return quizDtoList;
	}

	@Override
	public ApiResponse scheduleQuizTimeAndDate(SheduleQuizDto sheduledQuizDto,Long id) {
		System.out.println("service:"+sheduledQuizDto);
		Quiz q = quizDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found!"));
		q.setQuizScheduleDate(sheduledQuizDto.getQuizScheduleDate());
		q.setQuizScheduleTime(sheduledQuizDto.getQuizScheduleTime());
		System.out.println("service:"+q);
		return new ApiResponse("Quiz Sheduled");
	}

	@Override
	public List<ResQuizDto> getAllQuizByBatch(Long batchId) {
		Batch batch = batchDao.findById(batchId).orElseThrow(() -> new ResourceNotFoundException("Batch not found!"));
		List<Quiz> quizList = quizDao.findAllQuizByBatch(batchId);

		List<ResQuizDto> quizDtoList = new ArrayList<>();

		for (Quiz q : quizList) {
			ResQuizDto resQuiz = model.map(q, ResQuizDto.class);
			quizDtoList.add(resQuiz);
		}
		return quizDtoList;
	}

	@Override
	public List<ResQuizDto> getAllQuizBySubject(Long subjectId) {
		Subject subject = subjectDao.findById(subjectId)
				.orElseThrow(() -> new ResourceNotFoundException("subject not found!"));
		List<Quiz> quizList = quizDao.findAllQuizBySubject(subjectId);

		List<ResQuizDto> quizDtoList = new ArrayList<>();

		for (Quiz q : quizList) {

			ResQuizDto resQuiz = model.map(q, ResQuizDto.class);

			quizDtoList.add(resQuiz);
		}
		return quizDtoList;
	}

	@Override
	public ResQuizDto getQuizById(Long quizId) {
		Quiz quiz = quizDao.findById(quizId).orElseThrow(() -> new ResourceNotFoundException("Quiz not found!"));
		ResQuizDto resQuiz = model.map(quiz, ResQuizDto.class);
		return resQuiz;
	}

}
