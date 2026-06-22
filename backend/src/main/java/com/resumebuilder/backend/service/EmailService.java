package com.resumebuilder.backend.service;

public interface EmailService {
    void sendOtpEmail(String toEmail, String otp);
}