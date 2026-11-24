DataInsight – Employee Performance Analytics Platform

A full-stack web application designed to help organizations monitor, analyze, and manage employee performance and operational activity.

DataInsight provides role-based dashboards for employees, team leaders, and call center managers, enabling real-time visibility into daily and monthly performance metrics, operations, and sales activity.

Key Features

Role-Based Access Control

* Different access levels for employees, team leaders, call center managers, and administrators.
* Role-specific dashboards and permissions.
* Secure authentication and authorization using JWT.

Operations Management

* Create, update, and manage daily operational reports.
* Track employee activities and submitted operations.
* Monitor daily and monthly operational performance.

Performance Analytics

* View employee and team performance metrics.
* Track daily and cumulative activity.
* Monitor sales performance and compare results across employees and teams.

Management Dashboard

* Team leaders can monitor their team members’ activity and performance.
* Call center managers can oversee multiple teams.
* Administrators can manage users, teams, and permissions.

Data Management

* MongoDB database integration.
* Separate collections for daily and cumulative operational data.
* Historical data storage for performance tracking over time.

Technology Stack

Frontend

* React
* React Router
* Material UI
* JavaScript
* Fetch API

Backend

* Node.js
* Express.js
* REST APIs
* Mongoose

Database

* MongoDB

Security & Validation

* JWT (JSON Web Tokens)
* Bcrypt.js
* Joi

Additional Tools

* Morgan
* CORS
* Config
* Moment.js

Architecture

The application follows a client-server architecture:

* Frontend: React-based user interface with role-specific dashboards.
* Backend: Node.js and Express REST API handling business logic, authentication, and data operations.
* Database: MongoDB for storing user information, operational reports, sales data, and historical records.

Project Structure

DataInsight/
├── frontend/       # React application
└── backend/        # Node.js and Express server

Getting Started

Prerequisites

* Node.js
* npm
* MongoDB instance or MongoDB Atlas account

Backend Setup

cd backend
npm install
npm start

Configure the MongoDB connection using the backend environment configuration.

Frontend Setup

cd frontend
npm install
npm run dev

Configure the frontend to connect to the backend API.

Database Setup

Import the provided JSON data files into their corresponding MongoDB collections before using the application.

Make sure to configure the database connection and required environment variables locally.

Key Learning Outcomes

* Building a full-stack application using React and Node.js.
* Designing and implementing RESTful APIs.
* Working with MongoDB and Mongoose.
* Implementing authentication and role-based authorization.
* Managing different user roles and access permissions.
* Designing dashboards for operational and performance monitoring.
* Handling daily and historical data management.

⸻

Academic Full-Stack Development Project
