package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ReqResultDto;
import com.app.entity.StudQuizId;
import com.app.serviceImpl.ResultServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/result")
public class ResultController {

	@Autowired
	ResultServiceImpl resultService;
	
	@PostMapping("/generate")
	public ResponseEntity<?> addResult(@RequestBody @Valid  ReqResultDto resultDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(resultService.generateResult(resultDto));
	}
	
	@GetMapping("/getStudentGraphData/{id}")
	public ResponseEntity<?> getStudentGraphData(@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultService.quizWiseResult(id));
	}
	
	@GetMapping("/getMinMaxData/{id}")
	public ResponseEntity<?> getMinMaxData(@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultService.getMinMax(id));
	}
	
	@PostMapping("/getQuizAnalysisBySqID")
	public ResponseEntity<?> getQuizAnalysisBySqID(@RequestBody StudQuizId sqid){
		return ResponseEntity.ok(resultService.resultQuizAnalysis(sqid));
	}
	
	
	@GetMapping("/getQuizByStudentId/{id}")
	public ResponseEntity<?> getQuizByStudentId(@PathVariable Long id){
		return ResponseEntity.ok(resultService.getQuizByStud(id));
	}
}
