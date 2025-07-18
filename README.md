# 🎓 Student Management System

A full-stack web application for managing **student fee records**, built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🚀 Live Demo

👉 **Frontend:** [gyanpath2-frontend.onrender.com](https://gyanpath2-frontend.onrender.com)  
👉 **Backend API:** [gyanpath2-backend.onrender.com](https://gyanpath2-backend.onrender.com)

---

## ✨ Features

- 🧑‍🎓 Student registration and login (JWT Auth)
- 🔒 Secure student profile access
- 💳 Student can pay fees online
- 📊 Admin can view all students' payment status
- 📱 Responsive design for mobile and desktop
- 🔐 Protected routes for authenticated access

---

## 🛠 Tech Stack

### 💻 Frontend:
- React.js (with Vite)
- Tailwind CSS / Custom CSS
- React Router

### 🌐 Backend:
- Node.js + Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Stripe for payment integration
- dotenv, CORS, bcrypt

---

## 📦 Installation
```bash
### 🔧 Backend Setup
cd student-server
npm install
Add your .env file
npm run dev

### 🔧 Frontend Setup
cd student-frontend
npm install
Add your .env file with VITE_BACKEND_URL and VITE_STRIPE_SECRET_KEY
npm run dev

## Environment Variables

### Backend .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
### Frontend .env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_STRIPE_SECRET_KEY=your_stripe_public_key
