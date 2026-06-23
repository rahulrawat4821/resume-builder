package com.resumebuilder.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.resumebuilder.backend.entity.Resume;

@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {
    List<Resume> findByUserId(String userId);
}