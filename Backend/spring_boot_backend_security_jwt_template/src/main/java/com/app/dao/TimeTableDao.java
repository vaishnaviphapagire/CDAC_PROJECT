package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Role;
import com.app.entity.TimeTable;

public interface TimeTableDao extends JpaRepository<TimeTable, Long>{

	@Modifying
	@Query("delete from TimeTable t where t.role=role")
	void deleteByRole(Role role);
	TimeTable findByRole(Role role);
}
