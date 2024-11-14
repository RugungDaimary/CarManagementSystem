# Car Management System

This project is a Car Management System that allows users to create, update, delete, and view cars. Users can also upload images for each car and search for cars based on keywords. The project is built using the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Features

- User authentication (signup, login)
- Create, update, delete, and view cars
- Upload images for cars
- Search for cars based on keywords
- Responsive design using Tailwind CSS

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/RugungDaimary/car-management-system.git
   cd car-management-system
   ```

Folder Structure
backend/
.env
config/
[db.js](http://_vscodecontentref_/0)
controllers/
[authController.js](http://_vscodecontentref_/1)
[carController.js](http://_vscodecontentref_/2)
middleware/
[authMiddleware.js](http://_vscodecontentref_/3)
models/
[Car.js](http://_vscodecontentref_/4)
[User.js](http://_vscodecontentref_/5)
routes/
[authRoutes.js](http://_vscodecontentref_/6)
[carRoutes.js](http://_vscodecontentref_/7)
[server.js](http://_vscodecontentref_/8)
uploads/
utils/
[cloudinary.js](http://_vscodecontentref_/9)
frontend/
.env
.gitignore
[package.json](http://_vscodecontentref_/10)
[postcss.config.js](http://_vscodecontentref_/11)
public/
[index.html](http://_vscodecontentref_/12)
[manifest.json](http://_vscodecontentref_/13)
[robots.txt](http://_vscodecontentref_/14)
README.md
src/
[App.css](http://_vscodecontentref_/15)
[App.js](http://_vscodecontentref_/16)
components/
[index.css](http://_vscodecontentref_/17)
[index.js](http://_vscodecontentref_/18)
pages/
services/
slices/
[tailwind.config.js](http://_vscodecontentref_/19)
uploads/

Install dependencies for both backend and frontend:
cd backend
npm install
cd ../frontend
npm install

Create a .env file in the backend directory and add the following environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Create a .env file in the frontend directory and add the following environment variable:
REACT_APP_API_URL=http://localhost:5000/api

Start the backend server:
cd backend
npm run dev

Start the frontend development server:
cd frontend
npm start

API Endpoints
Auth Routes
POST /api/auth/signup - Signup a new user
POST /api/auth/login - Login a use

Car Routes
POST /api/cars - Create a new car
GET /api/cars - Get all cars
GET /api/cars/search?keyword=keyword - Search cars by keyword
GET /api/cars/:id - Get a car by ID
PUT /api/cars/:id - Update a car by ID
DELETE /api/cars/:id - Delete a car by ID
