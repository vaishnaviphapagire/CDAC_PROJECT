package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResQuizDto;
import com.app.dto.ResReqQuizDto;
import com.app.dto.SheduleQuizDto;
import com.app.serviceImpl.QuizServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	QuizServiceImpl quizService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addQuiz(@RequestBody @Valid  ResReqQuizDto quizDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.addQuiz(quizDto));
	}
	
	@GetMapping("/getQuiz/{id}")
	public ResponseEntity<?> getQuizByID(@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.getQuizById(id));
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteQuiz(@PathVariable  Long id){
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.deleteQuiz(id));
	}
	
	@GetMapping("/viewAll")
	public ResponseEntity<?> getAllQuiz(){
		return ResponseEntity.ok(quizService.getAllQuiz());
	}
	
	@GetMapping("/viewScheduledQuiz")
	public ResponseEntity<?> getAllSheduledQuiz(){
		return ResponseEntity.ok(quizService.getScheduledQuiz());
	}
	
	@GetMapping("/viewCompletedQuiz")
	public ResponseEntity<?> getAllCompletedQuiz(){
		return ResponseEntity.ok(quizService.getCompletedQuiz());
	}
	
	
	@PostMapping("/scheduleQuiz/{id}")
	public ResponseEntity<?> scheduleQuiz(@PathVariable Long id,@RequestBody @Valid SheduleQuizDto sheduleQuizDto){
		System.out.println("controoler:"+sheduleQuizDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.scheduleQuizTimeAndDate(sheduleQuizDto,id));
	}

//	@PostMapping("/scheduleQuiz")
//	public ResponseEntity<?> scheduleQuiz(@RequestBody @Valid SheduleQuizDto sheduleQuizDto){
//		return ResponseEntity.status(HttpStatus.CREATED).body(quizService.scheduleQuizTimeAndDate(sheduleQuizDto));
//	}
	
	@GetMapping("/viewBacthWiseQuiz/{id}")
	public ResponseEntity<?> getBatchWiseQuiz(@PathVariable Long id){
		return ResponseEntity.ok(quizService.getAllQuizByBatch(id));
	}
	
	@GetMapping("/viewSubjectWiseQuiz/{id}")
	public ResponseEntity<?> getSubjectWiseQuiz(@PathVariable Long id){
		return ResponseEntity.ok(quizService.getAllQuizByBatch(id));
	}
	
	
}
