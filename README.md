# 🎨 IlluVista — Digital Art Marketplace

> An immersive, full-stack SaaS platform dedicated to discovering, showcasing, and purchasing high-end digital artwork. Engineered with Next.js, Express.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://illuvista.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://illuvista-api.onrender.com)

**🌐 Live Demo:** [https://illuvista.vercel.app](https://illuvista.vercel.app)  
**⚙️ Backend API:** [https://illuvista-api.onrender.com](https://illuvista-api.onrender.com)

---

## 🌟 Introduction

IlluVista bridges the gap between digital artists and art collectors. Unlike traditional eCommerce platforms, IlluVista is designed specifically for digital mediums, offering a premium viewing experience, secure digital asset delivery, and a seamless checkout process.

---

## ✨ Core Features

- 🖼️ **Immersive Art Gallery:** Optimized server-side rendering (SSR) for lightning-fast browsing of high-resolution digital art.
- 🔐 **Robust Authentication:** Secure JWT-based auth flows with seamless **Google OAuth** integration for 1-click onboarding.
- 👩‍🎨 **Artist Dashboard:** A dedicated space for artists to securely upload artworks directly to **Cloudinary**, track sales, and manage inventory.
- 🛒 **Frictionless Checkout:** Intuitive cart and payment flow designed to maximize conversion rates.
- 👤 **Role-Based Access Control (RBAC):** Distinct experiences and permissions for Admins, Artists, and Collectors.
- 🎯 **Premium UI/UX:** Responsive layouts enhanced with Framer Motion animations and sleek Tailwind CSS styling.

---

## 🏗️ Architecture & Technology Stack

IlluVista employs a decoupled **Client-Server Architecture**, separating the presentation layer from the business logic to ensure scalability, security, and maintainability.

### Frontend (Client Layer)
Built for speed and SEO optimization.
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Data Fetching:** Native `fetch` with Next.js Server Components

### Backend (API Layer)
A stateless, RESTful API designed for high throughput.
- **Framework:** Express.js (Node.js)
- **Database:** MongoDB via Mongoose ODM
- **Authentication:** `passport.js` (Google OAuth 2.0), JWT (jose), and bcryptjs
- **Media Storage:** Cloudinary (via `multer-storage-cloudinary`)
- **Security:** Helmet, express-rate-limit, HTTP-only cookies

---

## 🔄 User Flow Lifecycle

### 1. Onboarding
- A user arrives at IlluVista and chooses to sign up.
- They select a role: **Collector** or **Artist**.
- They can register manually or click **"Continue with Google"**.
- The backend processes the OAuth flow, assigns the chosen role, generates a JWT, sets it in an HTTP-only cookie, and redirects the user to their respective dashboard.

### 2. The Artist Flow
- An **Artist** navigates to the Artist Dashboard.
- They fill out the artwork metadata (Title, Price, Medium) and attach a high-resolution image file.
- Upon submission, the Express backend intercepts the file using `multer`, uploads it directly to **Cloudinary**, and saves the optimized secure URL alongside the metadata in MongoDB.

### 3. The Collector Flow
- A **Collector** lands on the homepage. Next.js Server Components pre-fetch the featured artworks from the Express API, instantly delivering a fully rendered HTML page with zero loading spinners.
- The Collector browses the gallery, adds items to their cart, and proceeds to checkout to acquire the digital rights.

---

## 📁 Project Structure

```text
illuvista/
├── frontend/            # Next.js Application
│   ├── src/
│   │   ├── app/         # App Router (Pages, Layouts, API Routes)
│   │   ├── components/  # Modular React Components (Hero, Cards, etc.)
│   │   ├── context/     # Global State (AuthContext, CartContext)
│   │   └── types/       # TypeScript Definitions
│   ├── next.config.mjs  # Next.js Config (Cloudinary & Unsplash domains)
│   └── package.json     # Frontend dependencies
│
├── backend/             # Node.js/Express API
│   ├── src/
│   │   ├── controllers/ # Request handlers (Auth, Artworks, Orders)
│   │   ├── middleware/  # JWT Auth, Validation, Cloudinary Uploads
│   │   ├── models/      # Mongoose Database Schemas
│   │   ├── routes/      # Express Route Definitions
│   │   ├── services/    # Core Business Logic
│   │   └── index.js     # Server Entry Point
│   ├── .env.example     # Environment Variables Template
│   └── package.json     # Backend dependencies
│
└── package.json         # Root workspace manager
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB instance (Local or Atlas)
- Cloudinary Account (for image uploads)
- Google Cloud Console Project (for OAuth)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/Illuvista.git
cd Illuvista
npm run install:all
```

### 2. Environment Configuration
**Backend (`backend/.env`):**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Launch Development Servers
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 🚢 Deployment

**Frontend (Vercel):**
Connect your GitHub repository to Vercel. Set the Root Directory to `frontend`. Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend URL.

**Backend (Render):**
Create a new Web Service. Set Root Directory to `backend`. Use `npm install` for the build command and `npm start` for the start command. Add all backend environment variables. Update the `GOOGLE_CALLBACK_URL` and `FRONTEND_URL` to reflect your production domains.

---

## 📄 License

This project is licensed under the MIT License.

<p align="center">
  Built with ❤️ by Bhumit
</p>
