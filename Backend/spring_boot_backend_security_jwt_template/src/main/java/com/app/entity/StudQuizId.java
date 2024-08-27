package com.app.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;

@SuppressWarnings("serial")
@Embeddable
public class StudQuizId implements Serializable {
	
	private long quizId;
	private long studId;

	// Default constructor
	public StudQuizId() {
	}

	// Parameterized constructor
	public StudQuizId(long quizId, long studId) {
		this.quizId = quizId;
		this.studId = studId;
	}

	// Getters and setters
	public long getQuizId() {
		return quizId;
	}

	public void setQuizId(long quizId) {
		this.quizId = quizId;
	}

	public long getStudId() {
		return studId;
	}

	public void setStudId(long studId) {
		this.studId = studId;
	}

	// hashCode and equals implementation
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (quizId ^ (quizId >>> 32));
		result = prime * result + (int) (studId ^ (studId >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StudQuizId other = (StudQuizId) obj;
		if (quizId != other.quizId)
			return false;
		if (studId != other.studId)
			return false;
		return true;
	}
}
