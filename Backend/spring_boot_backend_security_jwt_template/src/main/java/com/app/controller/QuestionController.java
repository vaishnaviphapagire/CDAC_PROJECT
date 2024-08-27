package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ReqQuestionDto;
import com.app.dto.ReqResNewEditBatchDto;
import com.app.dto.ResQuestionDto;
import com.app.serviceImpl.QuestionServiceImpl;


@CrossOrigin
@RestController
@RequestMapping("/question")
@Validated
public class QuestionController {

	@Autowired
	QuestionServiceImpl questionService;

	@PostMapping("/add")
	public ResponseEntity<?> addQuestion(@RequestBody @Valid ReqQuestionDto questionDto) {
	//	System.out.println("Inside quest controler:"+ questionDto.toString());
		return ResponseEntity.status(HttpStatus.CREATED).body(questionService.addQuestion(questionDto));
	}
	
	@GetMapping("/viewQuizQuestions/{quizId}")
	public ResponseEntity<?> getQuestions(@PathVariable @NotNull Long quizId) {
		
		return ResponseEntity.status(HttpStatus.OK).body(questionService.getQuestionList(quizId));
	}
	
	@GetMapping("/get/{questionId}")
	public ResponseEntity<?> getQuestion(@PathVariable @NotNull Long questionId){
		return ResponseEntity.ok(questionService.editViewQuestion(questionId));
	}
	
	@PutMapping("/edit/{questionId}")
	public ResponseEntity<?> editQuestion(@RequestBody @Valid ResQuestionDto questionDto,@PathVariable Long questionId){
		return ResponseEntity.ok(questionService.editQuestion(questionDto, questionId));
	}
	
	
}
