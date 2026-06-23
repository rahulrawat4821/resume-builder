package com.resumebuilder.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.entity.Resume;
import com.resumebuilder.backend.service.ResumeService;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public ResponseEntity<Resume> createResume(
            @RequestBody Resume resume,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(resumeService.createResume(resume, email));
    }

    @GetMapping
    public ResponseEntity<List<Resume>> getAllResumes(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(resumeService.getAllResumes(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(
            @PathVariable String id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(resumeService.getResumeById(id, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(
            @PathVariable String id,
            @RequestBody Resume resume,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(resumeService.updateResume(id, resume, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(
            @PathVariable String id,
            Authentication authentication) {
        String email = authentication.getName();
        resumeService.deleteResume(id, email);
        return ResponseEntity.ok("Resume deleted successfully!");
    }
}