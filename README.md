Smart Hotel Management System

A full-stack hotel management web application developed as an academic project. The system provides a web-based platform for hotel guests and staff to manage room reservations, guest information, and room service requests.

Key Features

Room Management

* Display different room types and their details.
* Check room availability based on check-in and check-out dates.
* Create, update, and delete room records.
* Manage room status and pricing.

Reservation Management

* Create and manage hotel reservations.
* Check room availability for selected dates.
* Calculate and store reservation details, including total price.
* Update reservation status.
* Retrieve and delete reservations.

User Management & Authentication

* User registration and login.
* Session-based authentication.
* Manage guest information and user records.
* Support different user roles, including guests and staff.

Room Service Management

* Create and manage guest service requests.
* Retrieve and update service requests.
* Track request status.
* Allow staff to mark requests as completed through a dedicated dashboard.

Billing Management

* Create and manage billing records.
* Retrieve, update, and delete billing information.

Technology Stack

Frontend

* React
* JavaScript
* React Router
* Axios
* CSS

Backend

* Node.js
* Express.js
* RESTful APIs
* Express Session

Database

* MySQL
* MySQL2

Additional Tools

* Git
* npm

Project Architecture

The application follows a client-server architecture with separate frontend and backend components.

* Client: React application responsible for the user interface and navigation.
* Server: Node.js and Express application handling API requests and business logic.
* Database: MySQL for storing hotel-related data, including users, rooms, reservations, service requests, and billing records.

Project Structure

smart-hotel-management/
│
├── Client/
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Guest/
│       │   ├── Shared/
│       │   └── Staff/
│       ├── pages/
│       ├── Css/
│       └── assets/
│
└── Server/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── app.js

Getting Started

Prerequisites

* Node.js
* npm
* MySQL Server

1. Clone the repository

git clone YOUR_REPOSITORY_URL
cd smart-hotel-management

2. Configure the database

Create a MySQL database and configure the connection using environment variables.

Create a .env file in the project root:

MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database
PORT=3000
SESSION_SECRET=your_session_secret

Make sure the required database tables are created before running the application.

3. Install and run the backend

From the smart-hotel-management directory:

npm install
node Server/app.js

The backend runs on:

http://localhost:3000

4. Install and run the frontend

Open a separate terminal:

cd Client
npm install
npm start

The React application runs at:

http://localhost:3000

If the backend is already using port 3000, React will prompt to use another available port.

Academic Project

This project was developed as part of a Full-Stack Development academic project, focusing on frontend development, backend API implementation, database integration, and the development of a complete client-server application.
