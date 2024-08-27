package com.app.serviceImpl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.QuizDao;
import com.app.dao.ResultDao;
import com.app.dto.GetQuizByStudentIdDto;
import com.app.dto.QuizResultDto;
import com.app.dto.ReqResultDto;
import com.app.dto.ResQuestionDto;
import com.app.dto.ResResultDto;
import com.app.dto.ResultGetOutputDto;
import com.app.dto.ResultMinMaxDto;
import com.app.entity.Quiz;
import com.app.entity.Result;
import com.app.entity.StudQuizId;
import com.app.service.ResultService;

@Service
@Transactional
public class ResultServiceImpl implements ResultService {

	@Autowired
	ResultDao resultDao;

	@Autowired
	QuizDao quizDao;

	@Autowired
	QuestionServiceImpl questionService;

	@Autowired
	ModelMapper model;

	@Override
	public Result generateResult(ReqResultDto resultDto) {
		StudQuizId sqid = resultDto.getSqId();
		Result result = model.map(resultDto, Result.class);
		Quiz quiz = quizDao.findById(sqid.getQuizId())
				.orElseThrow(() -> new ResourceNotFoundException("Quiz id not found!"));
		Map<Long, Integer> markedOptions = resultDto.getMarkedOptions();
		List<ResQuestionDto> questionList = questionService.getQuestionList(quiz.getId());
		result.setTotalQue(questionList.size());
		for (ResQuestionDto question : questionList) {

			if (markedOptions.containsKey(question.getId())) {
				if (markedOptions.get(question.getId()) == question.getCorrectAns()) {
					result.setObtainedMarks(result.getObtainedMarks() + 1);
				}
			}

		}
		result.setCorrectQue(result.getObtainedMarks());
		result.setAttemptedQue(markedOptions.size());

		int wrong = result.getAttemptedQue() - result.getCorrectQue();
		result.setWrongQue(wrong);
		result.setNotAttempted(result.getTotalQue() - result.getAttemptedQue());
		return resultDao.save(result);
	}

	@Override
	public QuizResultDto quizWiseResult(Long id) {
		QuizResultDto dto = new QuizResultDto();

		int totalCount = resultDao.getTotalCountByQuizId(id);
		dto.setTotalCount(totalCount);

		Object[] result = resultDao.getAttemptedCountAndAverageRaw(id).get(0);
		ResultGetOutputDto countAvgDto = new ResultGetOutputDto(((Number) result[0]).intValue(),
				((Number) result[1]).doubleValue());

		dto.setAttemptedCount(countAvgDto.getCount());
		dto.setAvgMarks(countAvgDto.getAverage());

		int passCount = resultDao.getPassedCount(id);
		dto.setPassedCount(passCount);

		int failed = dto.getAttemptedCount() - passCount;
		dto.setNotAttempted(totalCount - dto.getAttemptedCount());
		dto.setFailedCount(failed);

		return dto;
	}

	@Override
	public List<ResultMinMaxDto> getMinMax(Long id) {
		List<ResultMinMaxDto> dtoList = new ArrayList<>();

		// Get obtained marks and titles
		List<Object[]> results = resultDao.getObtainedMarksAndQuizId(id);
		for (Object[] row : results) {
			ResultMinMaxDto dto = new ResultMinMaxDto();
			dto.setQuiz_id(((BigInteger) row[0]).longValue());
			dto.setObtained_marks((int) row[1]);
			dto.setTitle((String) row[2]);
			dtoList.add(dto);
		}

		List<Object[]> minMaxList = resultDao.getQuizIdMinMax();
		for (int i = 0; i < results.size(); i++) {
			for (int j = 0; j < minMaxList.size(); j++) {

				Long quizId = ((BigInteger) minMaxList.get(j)[0]).longValue();
				if (dtoList.get(i).getQuiz_id() == quizId) {
					Long min = ((Integer) minMaxList.get(j)[1]).longValue();
					Long max = ((Integer) minMaxList.get(j)[2]).longValue();
					dtoList.get(i).setMin(min);
					dtoList.get(i).setMax(max);
				}

			}
		}
		// Get min and max values
//		List<Object[]> mmResults = resultDao.getMinMax();
//		for (Object[] mmrow : mmResults) {
//			Long quizId = ((Long) mmrow[0]);
//			int min = ((int) mmrow[1]);
//			System.out.println("min");
//			int max = ((int) mmrow[2]);
//
//			for (ResultMinMaxDto ans : dtoList) {
//				if (ans.getQuiz_id() == (quizId)) {
//					ans.setMin(min);
//					ans.setMax(max);
//				}
//			}
//		}

		return dtoList;
	}

	@Override
	public Result resultQuizAnalysis(StudQuizId sqId) {
		Result res = resultDao.findAllBySqId(sqId)
				.orElseThrow(() -> new ResourceNotFoundException("Incorrect Student id and Quiz is "));
		return res;
	}

	@Override
	public List<GetQuizByStudentIdDto> getQuizByStud(Long id) {
		List<Object[]> objList = resultDao.getQuizByStudentId(id);
		List<GetQuizByStudentIdDto> dtoList = new ArrayList<GetQuizByStudentIdDto>();

		for (Object[] objects : objList) {
			GetQuizByStudentIdDto d1 = new GetQuizByStudentIdDto();
			d1.setId(((BigInteger) objects[0]).longValue());
			d1.setTitle((String) objects[1]);
			d1.setPassingMarks((int) objects[2]);

			dtoList.add(d1);
		}

		List<Object[]> extraList = resultDao.getExtraData(id);

		for (int i = 0; i < dtoList.size(); i++) {

			for (Object[] objects : extraList) {
				Long qId = ((BigInteger) objects[0]).longValue();
				if (qId == dtoList.get(i).getId()) {
					int obtMarks = (int) objects[1];
					if (obtMarks >= dtoList.get(i).getPassingMarks()) {
						dtoList.get(i).setRemark("Pass");
					} else {
						dtoList.get(i).setRemark("Fail");
					}
				}

			}

			
		}
		return dtoList;

	}
}
