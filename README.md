# Smart Resume Builder

A full-stack web application to create, customize, and download professional resumes with live preview, premium templates, secure authentication, and payment integration.

## Features

### Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Email Verification *(Planned)*

### Resume Builder

* Create Resume
* Edit Resume
* Delete Resume
* Save Drafts
* Live Preview

### Templates

* Modern Template
* Professional Template
* Minimal Template
* Theme & Color Customization

### Premium Features

* Premium Templates
* Watermark-Free PDF Export
* Subscription Unlock via Razorpay

### Additional Features

* Profile Image Upload
* Download Resume as PDF
* Responsive UI
* Clean Error Handling
* Toast Notifications

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Axios

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* JWT Authentication
* Maven

### Database

* MongoDB

### Payment

* Razorpay

---

## Project Structure

```bash
resume-builder/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── constants/
│
├── backend/
│   ├── src/main/java/com/resumebuilder/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── util/
│
└── README.md
```

---

## Database Design

### Users Collection

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "verified": false
}
```

### Resume Collection

```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "personalInfo": {},
  "education": [],
  "skills": [],
  "experience": [],
  "projects": []
}
```

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd resume-builder
```

---

### Backend Setup

```bash
cd backend
```

Configure MongoDB in:

`src/main/resources/application.properties`

Example:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/resume_builder
```

Run backend:

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Development Roadmap

### Phase 1

* Project Setup
* Folder Architecture
* Authentication

### Phase 2

* Resume CRUD
* Dashboard

### Phase 3

* Live Preview
* Templates
* PDF Export

### Phase 4

* Razorpay Integration
* Premium Unlock
* Deployment

---

## Learning Goals

This project is focused on improving:

* Full-Stack Development
* Spring Security
* React Architecture
* MongoDB Schema Design
* Payment Integration
* Production-Level Coding Practices

---

## Future Improvements

* AI Resume Suggestions
* ATS Score Checker
* Drag-and-Drop Sections
* Multi-language Resume Support
* Cloud Storage

---

## Author

Built by Rahul as a portfolio project to master Spring Boot + React full-stack development.
