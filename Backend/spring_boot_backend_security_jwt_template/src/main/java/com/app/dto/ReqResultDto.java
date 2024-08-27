package com.app.dto;

import java.util.HashMap;
import java.util.Map;

import com.app.entity.StudQuizId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReqResultDto {
	
	private StudQuizId sqId;
	
	private Map<Long,Integer> markedOptions=new HashMap<Long, Integer>();
}
