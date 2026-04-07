# Job_Hunter
Job Hunter - Job Search and Recruitment Platform

Job Hunter is a full-stack job marketplace platform that connects job seekers with employers. It enables job discovery, application management, real-time communication, and administrative control within a role-based system.

Project Statement

The product vision is to deliver a streamlined hiring experience with:

Location-based job search and filtering
Job posting and applicant management for employers
Application tracking with status updates
Real-time communication between job seekers and employers
Admin moderation, dispute handling, and platform analytics
Technology Stack

Frontend: React.js, Vite, Tailwind CSS, Redux Toolkit
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT (jsonwebtoken), bcryptjs
File Uploads: Multer, Cloudinary
State Management: Redux Toolkit, Redux Persist
UI Libraries: Radix UI, Framer Motion, Lucide Icons

System Modules

Module A: User and Role Management (job seeker, employer, admin)
Module B: Job Listings and Search
Module C: Application and Hiring Workflow
Module D: Chat, Notifications, Reviews
Module E: Admin Dashboard and Moderation

Project Delivery Status

Status legend:

Done: Implemented and available in the project
Module 1 - Authentication and Basic Setup

Planned tasks:

Backend and frontend setup
JWT-based authentication (login/register)
Role-based access (job seeker, employer, admin)
Protected routes and dashboards

Current status: Done

Delivered in repository:

Complete authentication system using JWT
Secure password hashing with bcryptjs
Role-based routing and dashboards
Express middleware-based authentication
Environment-based configuration using dotenv
Module 2 - Job Listings and Search

Planned tasks:

Job categories and structured listings
Employer job posting system
Job search with filters
Job detail page

Current status: Done

Delivered in repository:

Job CRUD operations for employers
Job browsing and filtering for users
Structured job listings
Detailed job view with application option
Module 3 - Applications and Interaction

Planned tasks:

Job application system
Application status tracking
Employer-side applicant management
Real-time communication
Notifications

Current status: Done

Delivered in repository:

Complete application lifecycle
Application status updates (Applied, Reviewed, Accepted, Rejected)
Employer dashboard for managing applicants
Messaging and notification system
API-based interaction between users and employers
Module 4 - Admin Panel and Final Enhancements

Planned tasks:

User and employer management
Job moderation
Dispute handling
Analytics dashboard

Current status: Done

Delivered in repository:

Admin dashboard with platform insights
User and employer lifecycle management
Job moderation (approve/remove jobs)
Report and dispute handling system
Fully integrated and stable platform
Implemented Features by Role
Job Seeker
Dashboard with activity overview
Job search and filtering
Job application submission
Application tracking
Profile and settings management
Employer
Dashboard with job and applicant insights
Job posting and management
Applicant tracking and actions
Company/profile management
Admin
Analytics dashboard with key metrics
User and employer management
Job moderation controls
Dispute handling system
Platform-wide monitoring
Notifications and System Behavior
Notifications are generated server-side for key events
Events include job applications, updates, and messages
Role-based notification handling
Persistent state using Redux Persist
AI Assistant
Gemini-based assistant integration
Helps with job search and platform guidance
Role-aware assistance
Expected Project Outcome Alignment

The intended outcomes are fully achieved:

Secure authentication and role-based dashboards: Achieved
Job discovery and application system: Achieved
User-employer interaction: Achieved
Admin moderation and analytics: Achieved
Database Schema Reference

Primary entities:

Users
Jobs
Applications
Messages
Reviews
Reports
Repository Structure
backend/: Node.js + Express API, routes, controllers, models
frontend/: React + Vite app with Redux and UI components
Local Setup
Prerequisites
Node.js 18+
npm
MongoDB (local or MongoDB Atlas)
1. Configure Environment Variables

Create .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
2. Run Backend
cd backend
npm install
npm run dev

👉 Backend runs at: http://localhost:5000
(using nodemon for auto-restart)

3. Run Frontend
cd frontend
npm install
npm run dev

👉 Frontend runs at: http://localhost:5173

Route Areas
Job Seeker: /user/*
Employer: /employer/*
Admin: /admin/*
Additional Backend Features
Secure authentication using JWT and cookies
File uploads handled via Multer
Cloudinary integration for media storage
CORS enabled for cross-origin requests
Cookie-based session handling
Outcome

This project successfully delivers:

Complete MERN stack job platform
Scalable backend with Express and MongoDB
Modern frontend with Vite and React
Production-ready architecture
