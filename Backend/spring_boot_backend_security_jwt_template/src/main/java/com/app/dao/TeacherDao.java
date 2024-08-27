package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Teacher;

public interface TeacherDao extends JpaRepository<Teacher, Long> {

}
