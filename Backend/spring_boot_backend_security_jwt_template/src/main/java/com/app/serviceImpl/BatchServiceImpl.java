package com.app.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.BatchDao;
import com.app.dto.ApiResponse;
import com.app.dto.BatchStudentListOutputDto;
import com.app.dto.ReqResNewEditBatchDto;
import com.app.entity.Batch;
import com.app.entity.Student;
import com.app.service.BatchService;

@Transactional
@Service
public class BatchServiceImpl implements BatchService {

	@Autowired
	private BatchDao batchDao;

	@Autowired
	private ModelMapper model;
	


	@Override
	public ApiResponse addBatch(ReqResNewEditBatchDto nebatchdto) {
		Batch batch = batchDao.save(model.map(nebatchdto, Batch.class));
		return new ApiResponse("Batch Added!");
	}

	@Override
	public ApiResponse editBatch(ReqResNewEditBatchDto nebatchdto, Long id) {
		Batch batch = batchDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Batch of given Id not found!"));
		batch.setBatchName(nebatchdto.getBatchName());
		batch.setBatchCount(nebatchdto.getBatchCount());
		//entityManager.merge(batch);
		return new ApiResponse("Batch Edited!");
	}

	@Override
	public ApiResponse deleteBatch(Long id) {
		Batch batch = batchDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Batch of given Id not found!"));

		List<Student> studList = batch.getStudentList().stream().map((stud) -> {
			batch.removeStudent(stud);
			return stud;
		}).collect(Collectors.toList());

		batch.setDeleted(true);
		return null;
	}

	@Override
	public List<ReqResNewEditBatchDto> getAllBatches() {
		List<Batch> batchList = batchDao.findAll();
		List<ReqResNewEditBatchDto> viewBatchList = batchList.stream().map(batch -> {
			return model.map(batch, ReqResNewEditBatchDto.class);
		}).collect(Collectors.toList());
		return viewBatchList;
	}

	
	@Override
	public BatchStudentListOutputDto getAllStudentsByBatch(Long id) {
		Batch batch = batchDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Batch of given Id not found!"));
		Batch b = batchDao.getStudentsByBatch(id);
		
		BatchStudentListOutputDto ans = model.map(b, BatchStudentListOutputDto.class);
		return ans;
	}

	@Override
	public ReqResNewEditBatchDto getBatch(Long id) {
		Batch b=batchDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Batch of given Id not found!"));
		return model.map(b, ReqResNewEditBatchDto.class);
	}

}
