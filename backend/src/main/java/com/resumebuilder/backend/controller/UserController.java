package com.resumebuilder.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.dto.request.UpdateProfileRequest;
import com.resumebuilder.backend.dto.response.ProfileResponse;
import com.resumebuilder.backend.service.UserService;

import com.resumebuilder.backend.service.CloudinaryService;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    public UserController(UserService userService , CloudinaryService cloudinaryService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getProfile(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateProfile(email, request));
    }
    
     @PostMapping("/upload-photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        String email = authentication.getName();

        // Upload to Cloudinary
        String imageUrl = cloudinaryService.uploadImage(file);

        // Save URL to user profile
        userService.updateProfilePhoto(email, imageUrl);

        return ResponseEntity.ok(Map.of("profilePicture", imageUrl));
    }

}