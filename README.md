# Student Management Application

![Full Stack Open](https://img.shields.io/badge/Full%20Stack%20Open-2024-blue.svg)

## Overview

This project is a **Student Management Application** built as part of the University of Helsinki's [Full Stack Open](https://fullstackopen.com/en/) course. The application follows modern full-stack development practices, including a robust frontend built with React, a secure backend powered by Node.js and Express, and a MongoDB database for storing student data.

## Features

- **User Authentication:** Secure login and registration using JSON Web Tokens (JWT).
- **CRUD Operations:** Fully functional Create, Read, Update, Delete operations for managing student data.
- **Responsive UI:** A user-friendly interface that adapts to different screen sizes, ensuring a smooth experience across devices.
- **RESTful API:** Clean and scalable API design, following REST principles.
- **Form Validation:** Robust validation on both client and server sides.
- **Error Handling:** Comprehensive error handling mechanisms for improved stability and user experience.
- **Pagination:** Efficient data handling and display using pagination techniques.
- **Security Practices:** Implementation of security best practices, including sanitization of inputs and secure storage of sensitive information.

## Technology Stack

- **Frontend:** React, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git, GitHub
- **Testing:** Vitest, Playwright
- **Deployment:** Vite (for development), Node.js environment

## Principles & Best Practices

### 1. **Component-Based Architecture**
   - The application is built using a modular, component-based architecture. Each UI component is encapsulated with its own logic and styling, promoting reusability and maintainability.

### 2. **State Management**
   - State is managed effectively using React’s `useState` and `useReducer` hooks, ensuring that components are responsive to user interactions and data changes.
   - Form data and application state are handled using controlled components, providing clear and predictable state management.

### 3. **Routing & Navigation**
   - React Router is used for client-side routing, enabling a seamless, single-page application (SPA) experience.
   - Dynamic routing is implemented for navigating between different student profiles, enhancing user interaction.

### 4. **Backend API Design**
   - The backend API is designed following REST principles, with clear and predictable routes (`/api/students`, `/api/login`, etc.).
   - Middleware is used extensively for tasks such as authentication, error handling, and request validation.

### 5. **Database Management**
   - MongoDB is used as the database, with Mongoose as the ODM (Object Data Modeling) library.
   - Schemas are defined using Mongoose, enforcing data integrity and providing a structured approach to data management.

### 6. **Security**
   - User authentication is handled using JWTs, ensuring secure and stateless sessions.
   - Passwords are hashed using bcrypt before storing them in the database, safeguarding user data.
   - CORS (Cross-Origin Resource Sharing) is configured to control access to the API from different origins.

### 7. **Testing**
   - The application is tested using Vitest for unit and integration tests, ensuring code reliability.
   - End-to-end tests are implemented using Playwright, simulating real user interactions to catch any potential issues before deployment.

### 8. **Responsive Design**
   - The UI is fully responsive, built with a mobile-first approach. CSS Flexbox and Grid are used to create a layout that adjusts seamlessly across different screen sizes.

### 9. **Error Handling & Logging**
   - Error handling is implemented across both frontend and backend, with user-friendly messages displayed for any issues encountered.
   - Logging is set up on the server side using `console.log` and `morgan` middleware for tracking requests and debugging.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/M3X1CO/RSU-RIO.git
   cd student-management-app


## Live Demo

You can view the live demo of the Student Management Application at:

[https://rsu-rio.onrender.com/](https://rsu-rio.onrender.com/)

Feel free to explore the features and see the application in action.

### Login Details

To log in and explore the application, use the following credentials:

- **Username:** test12
- **Password:** test12

### Admin Role

- **Username:** admin4
- **Password:** J20W£j3)/b$c
