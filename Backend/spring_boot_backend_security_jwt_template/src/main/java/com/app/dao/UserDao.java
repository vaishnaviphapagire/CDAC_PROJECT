package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Role;
import com.app.entity.UserEntity;

public interface UserDao extends JpaRepository<UserEntity, Long>{
	
	 @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.password = :password AND u.role = :role")
	    Optional<UserEntity> findByEmailAndPasswordAndRole(
	            @Param("email") String email,
	            @Param("password") String password,
	            @Param("role") Role role
	    );

	 
}
