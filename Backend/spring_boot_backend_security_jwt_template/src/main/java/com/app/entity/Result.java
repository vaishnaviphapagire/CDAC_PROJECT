package com.app.entity;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Result implements Serializable{

	    @EmbeddedId
	    private StudQuizId sqId;

	    private int obtainedMarks=0;
	    
	    private int correctQue;
	    
	    private int attemptedQue;
	    
	    private int wrongQue;
	    
	    private int totalQue;
	    
	    private int notAttempted;
	    
	    


	
}
