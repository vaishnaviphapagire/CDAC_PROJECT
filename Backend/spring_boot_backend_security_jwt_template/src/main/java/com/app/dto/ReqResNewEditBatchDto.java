package com.app.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqResNewEditBatchDto extends BaseDto{
	//To get dto for adding and editing batch
	@NotNull
	private String batchName;
	@NotNull
	private int batchCount;
	//Batch entity count=0
}
