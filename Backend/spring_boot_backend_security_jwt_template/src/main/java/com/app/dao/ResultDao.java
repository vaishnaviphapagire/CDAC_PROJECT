package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.GetQuizByStudentIdDto;
import com.app.dto.ResultGetOutputDto;
import com.app.entity.Result;
import com.app.entity.StudQuizId;

public interface ResultDao extends JpaRepository<Result, StudQuizId> {

	
	 Optional<Result> findAllBySqId(StudQuizId sqId);
	 
	 
	 
	 @Query(value = "select id , title , passing_marks from quiz where id "
	 		+ "in (select quiz_id from result where stud_id = :id group by quiz_id) ", nativeQuery = true)
		List<Object[]> getQuizByStudentId(@Param("id") Long id);
		
		
	@Query(value = "select quiz_id , obtained_marks from result where stud_id =:id group by quiz_id; ", nativeQuery = true)
		List<Object[]> getExtraData(@Param("id") Long id);
	
		

	@Query(value = "SELECT SUM(batch_count) as totalCount "
			+ "FROM batch WHERE id IN (SELECT batch_id FROM quiz_batch WHERE quiz_id = :id)", nativeQuery = true)
	int getTotalCountByQuizId(@Param("id") Long id);

	@Query(value = "SELECT COUNT(*) as count, AVG(obtained_marks) as average "
			+ "FROM result WHERE quiz_id = :id", nativeQuery = true)
	List<Object[]> getAttemptedCountAndAverageRaw(@Param("id") Long id);;

	@Query(value = "SELECT COUNT(*) as count " + "FROM result, quiz "
			+ "WHERE obtained_marks > passing_marks AND quiz.id = result.quiz_id AND result.quiz_id = :id", nativeQuery = true)
	int getPassedCount(@Param("id") Long id);
	
	
//	@Query(value = "select quiz_id , obtained_marks  , title from result , quiz "
//			+ " where stud_id = :id and quiz_id = id;", nativeQuery = true)
//	List<Object[]> getObtainedMarksAndQuizId(@Param("id") Long id);
//	
//	
//	@Query(value = "select quiz_id , obtained_marks  , title from result , quiz "
//			+ " where stud_id = :id and quiz_id = id;", nativeQuery = true)
//	List<Object[]> getMinMax(@Param("id") Long id);
	
	
	@Query(value = "SELECT quiz_id, obtained_marks, title FROM result JOIN quiz ON result.quiz_id = quiz.id WHERE stud_id = :id", nativeQuery = true)
	List<Object[]> getObtainedMarksAndQuizId(@Param("id") Long id);
	
	
	@Query(value = "select quiz_id ,min(obtained_marks) , max(obtained_marks) from result group by quiz_id;", nativeQuery = true)
	List<Object[]> getQuizIdMinMax();

//	@Query("SELECT r.sqId.quizId, MIN(r.obtainedMarks), MAX(r.obtainedMarks)"
//			+ "FROM Result"
//			+ "GROUP BY r.sqId.quizId")
//	List<Object[]> getMinMax();

}
