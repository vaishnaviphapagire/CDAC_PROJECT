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

import com.app.dto.ReqResNewEditBatchDto;
import com.app.serviceImpl.BatchServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/batch")
@Validated
public class BatchController {

	@Autowired
	BatchServiceImpl batchService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addBatch(@RequestBody @Valid ReqResNewEditBatchDto nedto){
		return ResponseEntity.status(HttpStatus.CREATED).body(batchService.addBatch(nedto));
	}
	
	@GetMapping("/allBatches")
	public ResponseEntity<?> getAllBatches(){
		return ResponseEntity.ok(batchService.getAllBatches());
	}
	
	@GetMapping("/editView/{id}")
	public ResponseEntity<?> editBatch(@PathVariable Long id){
		return ResponseEntity.ok(batchService.getBatch(id));
	}
	
	@PutMapping("/edit/{id}")
	public ResponseEntity<?> editBatch(@RequestBody @Valid ReqResNewEditBatchDto nedto,@PathVariable Long id){
		return ResponseEntity.ok(batchService.editBatch(nedto,id));
	}
	
	@GetMapping("/delete/{id}")
	public ResponseEntity<?> deleteBatch(@PathVariable @NotNull(message = "id cannot be null") Long id){
		return ResponseEntity.status(HttpStatus.CREATED).body(batchService.deleteBatch(id));
	}
	
	@GetMapping("/studentList/{id}")
	public ResponseEntity<?> getStudentListByBtach(@PathVariable @NotNull(message = "id cannot be null") Long id){
		return ResponseEntity.status(HttpStatus.CREATED).body(batchService.getAllStudentsByBatch(id));
	}
}
