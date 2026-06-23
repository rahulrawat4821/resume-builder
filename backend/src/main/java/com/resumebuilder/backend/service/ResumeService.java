package com.resumebuilder.backend.service;

import java.util.List;

import com.resumebuilder.backend.entity.Resume;

public interface ResumeService {
    Resume createResume(Resume resume, String email);
    List<Resume> getAllResumes(String email);
    Resume getResumeById(String id, String email);
    Resume updateResume(String id, Resume resume, String email);
    void deleteResume(String id, String email);
}