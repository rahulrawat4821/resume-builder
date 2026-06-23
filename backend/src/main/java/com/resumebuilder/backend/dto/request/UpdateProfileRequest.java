package com.resumebuilder.backend.dto.request;

public class UpdateProfileRequest {
    private String name;
    private String phone;
    private String jobTitle;
    private String address;

    public UpdateProfileRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}