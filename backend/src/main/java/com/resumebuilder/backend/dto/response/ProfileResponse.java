package com.resumebuilder.backend.dto.response;

public class ProfileResponse {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String jobTitle;
    private String address;
    private String profilePicture;
    private String plan;

    public ProfileResponse() {}

    public ProfileResponse(String id, String name, String email, String phone,
                           String jobTitle, String address, String profilePicture, String plan) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.address = address;
        this.profilePicture = profilePicture;
        this.plan = plan;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
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
}