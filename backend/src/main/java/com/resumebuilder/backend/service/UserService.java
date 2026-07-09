package com.resumebuilder.backend.service;

import com.resumebuilder.backend.dto.request.UpdateProfileRequest;
import com.resumebuilder.backend.dto.response.ProfileResponse;

public interface UserService {
    ProfileResponse getProfile(String email);
    ProfileResponse updateProfile(String email, UpdateProfileRequest request);
    void updateProfilePhoto(String email, String imageUrl);

}