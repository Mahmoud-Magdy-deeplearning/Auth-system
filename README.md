# Authentication & Authorization system




https://github.com/Mahmoud-Magdy-deeplearning/Auth-system/assets/59231851/f93c87cb-679a-45c8-9005-0bdfb583701c





## Overview

This project is a full-stack application that implements a robust authentication and authorization system. It utilizes Nest.js and MongoDB on the backend for server-side logic, authentication, and authorization. On the frontend, React, Redux, and Tailwind CSS are employed to create a dynamic and responsive user interface.

## Prerequisites

- Node.js & npm: Make sure you have Node.js and npm installed on your machine.
- Install yarn globally using this command in terminal
	  ```npm install --global yarn ```

## Features

- **User Authentication:** Implement user signup and login functionality.
- **JWT (JSON Web Tokens):** Utilize JWT for secure and stateless authentication.
- **Authorization:** Create protected routes that can only be accessed by authenticated users.
- **MongoDB Integration:** Store user data securely in a MongoDB database.
- **Protected API:**
  - Implement a protected API that requires authentication using JWT tokens.
  - Only authenticated users with valid JWT tokens can access this API.
  - Ensure proper authorization checks for each endpoint to secure your application.

## Technologies Used
- <span style="color:blue">**Backend:**</span>
  - **Nest.js:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
  - **MongoDB:** A NoSQL database for storing user information.
  - **JWT:** JSON Web Tokens for secure authentication.
  - 
- <span style="color:blue">**Frontend:**</span>
  - **React:** A JavaScript library for building user interfaces.
  - **Redux:** A predictable state container for managing application state.
  - **Tailwind CSS:** A utility-first CSS framework for styling.

## Installation
1. Clone the repository:
  - ```sh
    git clone https://github.com/your-username/authentication-system.git
	cd authentication-system
	```
2. Install dependencies:
  - ```sh
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
	```
## Configuration
1. **Backend Configuration:**
	- Rename backend/.env.example to backend/.env and update the configuration variables, such as MONGODB_URI and JWT_SECRET.
2. **Frontend Configuration:**
	- Rename frontend/.env.example to frontend/.env and update the configuration variables, such as REACT_APP_API_URL.

## Running the Application
1. **Run Backend:**

  - ```sh
   	# Inside the backend directory
	npm start
	```
    The server will start on http://localhost:5000.
2. **Run Frontend:**
  - ```sh
   	# Inside the frontend directory
	npm start
	```
    The React application will be accessible at http://localhost:3000.
## Usage
- Open your browser and navigate to http://localhost:3000 to access the application.
- Use the provided routes for signup and login.
- Protected routes will be available for logged-in users, and unauthorized users will be forbidden from accessing certain routes.


## Author
Contact: [Mahmoud Magdy](mailto:mahmoudmagdymahmoud1@gmail.com)
