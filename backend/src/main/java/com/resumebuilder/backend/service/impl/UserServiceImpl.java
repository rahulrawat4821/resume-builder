package com.resumebuilder.backend.service.impl;

import org.springframework.stereotype.Service;

import com.resumebuilder.backend.dto.request.UpdateProfileRequest;
import com.resumebuilder.backend.dto.response.ProfileResponse;
import com.resumebuilder.backend.entity.User;
import com.resumebuilder.backend.repository.UserRepository;
import com.resumebuilder.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

  private ProfileResponse toProfileResponse(User user) {
    return new ProfileResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getJobTitle(),
            user.getAddress(),
            user.getProfilePicture(),
            user.getPlan(),
            user.getResumesCreated()
    );
}

    @Override
    public ProfileResponse getProfile(String email) {
        User user = getUser(email);
        return toProfileResponse(user);
    }

    @Override
    public ProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = getUser(email);
        if (request.getName() != null) user.setName(request.getName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getJobTitle() != null) user.setJobTitle(request.getJobTitle());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        userRepository.save(user);
        return toProfileResponse(user);
    }

    @Override
public void updateProfilePhoto(String email, String imageUrl) {
    User user = getUser(email);
    user.setProfilePicture(imageUrl);
    userRepository.save(user);
}
}