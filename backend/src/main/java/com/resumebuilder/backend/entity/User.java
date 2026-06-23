package com.resumebuilder.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    private boolean verified;

    private String otp;
    private LocalDateTime otpExpiry;

    // Profile fields
    private String phone;
    private String jobTitle;
    private String address;
    private String profilePicture;
    private String plan = "FREE";
    private LocalDateTime planExpiry;

    // Constructors
    public User() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
    public String getPlan() { return plan; }
    public void setPlan(String plan) { this.plan = plan; }
    public LocalDateTime getPlanExpiry() { return planExpiry; }
    public void setPlanExpiry(LocalDateTime planExpiry) { this.planExpiry = planExpiry; }
}