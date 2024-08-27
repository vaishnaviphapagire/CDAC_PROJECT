package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.BatchStudentListOutputDto;
import com.app.dto.ReqResNewEditBatchDto;
import com.app.entity.Batch;

public interface BatchService {
	
	ApiResponse addBatch(ReqResNewEditBatchDto nebatchdto);

	ApiResponse editBatch(ReqResNewEditBatchDto nebatchdto,Long id);

	ApiResponse deleteBatch(Long id);

	List<ReqResNewEditBatchDto> getAllBatches();
	
	BatchStudentListOutputDto getAllStudentsByBatch(Long id);
	
	ReqResNewEditBatchDto getBatch(Long id);
}
