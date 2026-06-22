package com.resumebuilder.backend.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.resumebuilder.backend.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Resume Builder - Email Verification OTP");
        message.setText("Your OTP for email verification is: " + otp +
                "\n\nThis OTP is valid for 5 minutes." +
                "\n\nDo not share this OTP with anyone.");
        mailSender.send(message);
    }
}