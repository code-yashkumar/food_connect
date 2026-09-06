# Food Delivery System (FoodConnect)

Full-stack food delivery web application built with Node.js, Express, MongoDB, Socket.io, React, Tailwind CSS, and Vite.

---

## Project Structure

```
├── backend/             # Express & Node.js backend with Socket.io
│   ├── config/          # Database configuration (MongoDB)
│   ├── controllers/     # Route controllers (Auth, Order, Shop, Item, User)
│   ├── middlewares/     # Auth & upload middlewares
│   ├── models/          # Mongoose database models
│   ├── routes/          # Express API routes
│   ├── utils/           # Cloudinary, Mailer, Token helpers
│   ├── .env.example     # Backend environment template
│   └── index.js         # Backend server entry point
├── frontend/            # React (Vite) Single Page Application
│   ├── src/             # React components, pages, Redux store
│   ├── .env.example     # Frontend environment template
│   └── vite.config.js   # Vite configuration
└── README.md            # Project setup & run guide
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [MongoDB](https://www.mongodb.com/) (local instance running or MongoDB Atlas connection URI)

Optional third-party accounts for full feature support:
- [Cloudinary](https://cloudinary.com/) (for dish and shop image uploads)
- [Razorpay](https://razorpay.com/) (for checkout and payment integration)
- [Firebase](https://firebase.google.com/) (for Google authentication / Firebase auth)
- Gmail App Password (for OTP and order notification emails)

---

## Setup & Installation

### 1. Backend Setup

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   A `.env` file has been pre-created. You can review or modify it based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URL=mongodb://localhost:27017/foodconnect
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=supersecretjwtkey12345
   NODE_ENV=development

   # Cloudinary (Image uploads)
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   # Razorpay (Payments)
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=

   # Gmail / Nodemailer (OTPs)
   EMAIL=
   PASS=
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   A `.env` file has been pre-created based on `.env.example`:
   ```env
   VITE_SERVER_URL=http://localhost:5000
   VITE_FIREBASE_APIKEY=
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.
