package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Holiday;

public interface HolidayDao extends JpaRepository<Holiday, Long>{

}
