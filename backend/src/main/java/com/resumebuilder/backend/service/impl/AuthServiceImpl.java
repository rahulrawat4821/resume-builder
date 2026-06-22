package com.resumebuilder.backend.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.dto.request.LoginRequest;
import com.resumebuilder.backend.dto.request.RegisterRequest;
import com.resumebuilder.backend.dto.request.VerifyOtpRequest;
import com.resumebuilder.backend.dto.response.AuthResponse;
import com.resumebuilder.backend.entity.User;
import com.resumebuilder.backend.repository.UserRepository;
import com.resumebuilder.backend.service.AuthService;
import com.resumebuilder.backend.service.EmailService;
import com.resumebuilder.backend.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;


    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder , JwtUtil jwtUtil , EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

@Override
public AuthResponse register(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already exists");
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setVerified(false);

    String otp = generateOtp();
    user.setOtp(otp);
    user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

    userRepository.save(user);

    // Send OTP to email
    emailService.sendOtpEmail(request.getEmail(), otp);

    return new AuthResponse("User registered successfully. OTP sent to your email!");
}

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }  // ✅ this } was missing before verifyOtp

    @Override
    public AuthResponse verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()) {
            return new AuthResponse("User already verified");
        }

        if (!user.getOtp().equals(request.getOtp().trim())) {
            throw new RuntimeException("Invalid OTP");
        }

        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return new AuthResponse("Email verified successfully!");
    }

    @Override
public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.isVerified()) {
        throw new RuntimeException("Email not verified. Please verify OTP first");
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtUtil.generateToken(user.getEmail());

    return new AuthResponse("Login successful!", token);
  }


}