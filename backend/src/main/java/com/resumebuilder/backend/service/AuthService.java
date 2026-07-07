package com.resumebuilder.backend.service;


import com.resumebuilder.backend.dto.request.LoginRequest;
import com.resumebuilder.backend.dto.request.RegisterRequest;
import com.resumebuilder.backend.dto.response.AuthResponse;
import com.resumebuilder.backend.dto.request.VerifyOtpRequest;


public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse verifyOtp(VerifyOtpRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse resendOtp(String email);


}
