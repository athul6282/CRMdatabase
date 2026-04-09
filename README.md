# MERN CRM Application

This project is a full-stack CRM application built for the "MERN Integration" assignment. It includes secure authentication, customer CRUD operations, MongoDB connectivity, modular backend architecture, responsive React pages, and Tailwind CSS styling.

## Tech Stack

- Frontend: React, Vite, React Router DOM, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, JSON Web Token

## Project Structure

```text
project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── package.json
├── .env.example
└── README.md
```

## Features

- User registration with password hashing
- User login with JWT token generation
- Protected route to fetch current user data
- Customer CRUD operations: create, read, update, delete
- Input validation on both frontend and backend
- Centralized backend error handling
- Responsive dashboard UI with Tailwind CSS

## Setup Instructions

### 1. Configure environment variables

Create a root `.env` file from `.env.example` so the backend can load MongoDB and JWT settings:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_crm
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

If you prefer keeping env files inside each app folder, use [server/.env.example](C:\Users\athul\OneDrive\Documents\New project\server\.env.example) for the backend and [client/.env.example](C:\Users\athul\OneDrive\Documents\New project\client\.env.example) for the frontend.

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Start the backend

```bash
cd server
npm run dev
```

### 5. Start the frontend

```bash
cd client
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Customers

- `GET /api/customers`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

## Postman Testing

Use Postman to test:

1. Register a user
2. Login and copy the JWT token
3. Add the token as `Bearer <token>` in the `Authorization` header
4. Create, fetch, update, and delete customer records

## Submission Notes

- Record a screen video showing register, login, and full CRUD functionality
- Push the project to GitHub with meaningful commits
- Include this README in the repository for documentation
