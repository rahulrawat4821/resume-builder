package com.resumebuilder.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.resumebuilder.backend.entity.Resume;
import com.resumebuilder.backend.entity.User;
import com.resumebuilder.backend.repository.ResumeRepository;
import com.resumebuilder.backend.repository.UserRepository;
import com.resumebuilder.backend.service.ResumeService;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeServiceImpl(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

  @Override
public Resume createResume(Resume resume, String email) {
    User user = getUser(email);

    // ✅ Permanent limit — tracks total ever created
    if ("FREE".equals(user.getPlan())) {
        if (user.getResumesCreated() >= 5) {
            throw new RuntimeException("Free plan allows only 5 resumes. Upgrade to Premium!");
        }
    }

    resume.setUserId(user.getId());
    resume.setCreatedAt(LocalDateTime.now());
    resume.setUpdatedAt(LocalDateTime.now());

    // ✅ Increment permanent count
    user.setResumesCreated(user.getResumesCreated() + 1);
    userRepository.save(user);

    return resumeRepository.save(resume);
}

    @Override
    public List<Resume> getAllResumes(String email) {
        User user = getUser(email);
        return resumeRepository.findByUserId(user.getId());
    }

    @Override
    public Resume getResumeById(String id, String email) {
        User user = getUser(email);
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        if (!resume.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        return resume;
    }

    @Override
    public Resume updateResume(String id, Resume updatedResume, String email) {
        Resume existing = getResumeById(id, email);
        existing.setTitle(updatedResume.getTitle());
        existing.setFullName(updatedResume.getFullName());
        existing.setEmail(updatedResume.getEmail());
        existing.setPhone(updatedResume.getPhone());
        existing.setAddress(updatedResume.getAddress());
        existing.setLinkedin(updatedResume.getLinkedin());
        existing.setGithub(updatedResume.getGithub());
        existing.setYoutube(updatedResume.getYoutube());
        existing.setWebsite(updatedResume.getWebsite());
        existing.setJobTitle(updatedResume.getJobTitle());
        existing.setSummary(updatedResume.getSummary());
        existing.setEducation(updatedResume.getEducation());
        existing.setExperience(updatedResume.getExperience());
        existing.setProjects(updatedResume.getProjects());
        existing.setCertifications(updatedResume.getCertifications());
        existing.setSkills(updatedResume.getSkills());
        existing.setLanguages(updatedResume.getLanguages());
        existing.setUpdatedAt(LocalDateTime.now());
        existing.setProfilePhoto(updatedResume.getProfilePhoto());
        return resumeRepository.save(existing);
    }

    @Override
    public void deleteResume(String id, String email) {
        Resume resume = getResumeById(id, email);
        resumeRepository.delete(resume);
    }
}