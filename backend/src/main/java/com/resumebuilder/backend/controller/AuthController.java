package com.resumebuilder.backend.controller;


import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumebuilder.backend.dto.request.LoginRequest;
import com.resumebuilder.backend.dto.request.RegisterRequest;
import com.resumebuilder.backend.dto.request.VerifyOtpRequest;
import com.resumebuilder.backend.dto.response.AuthResponse;
import com.resumebuilder.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
public ResponseEntity<AuthResponse> verifyOtp(
        @RequestBody VerifyOtpRequest request) {

    AuthResponse response = authService.verifyOtp(request);
    return ResponseEntity.ok(response);
}


@PostMapping("/login")
public ResponseEntity<AuthResponse> login(
        @RequestBody LoginRequest request) {

    AuthResponse response = authService.login(request);
    return ResponseEntity.ok(response);
}

@PostMapping("/resend-otp")
public ResponseEntity<AuthResponse> resendOtp(@RequestBody Map<String, String> body) {
    return ResponseEntity.ok(authService.resendOtp(body.get("email")));
}
}
