# 🎨 IlluVista — Digital Art Marketplace

> A full-stack SaaS platform for discovering, showcasing, and purchasing digital artwork. Built with Next.js and Express.js.

[![Live Demo](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://illuvista.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://illuvista-api.onrender.com)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖼️ **Art Gallery** | Browse and filter digital artworks by category |
| 🔐 **Authentication** | Secure JWT-based login/register with role-based access |
| 👩‍🎨 **Artist Dashboard** | Upload, manage, and track artwork sales |
| 🛒 **Cart & Checkout** | Add to cart and purchase artworks seamlessly |
| 👤 **User Roles** | Admin, Artist, and Buyer with distinct permissions |
| 📊 **Admin Panel** | Manage users, artworks, and orders |
| 🔔 **Notifications** | Real-time alerts for sales and comments |
| 🎯 **Responsive UI** | Fully responsive with smooth animations |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Express.js, Node.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT (jose), bcryptjs, HTTP-only cookies |
| **3D/Visuals** | Three.js, React Three Fiber |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
illuvista/
├── frontend/            # Next.js client app
│   ├── src/
│   │   ├── app/         # Pages & layouts (App Router)
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth & Cart providers
│   │   ├── services/    # API service layer
│   │   └── types/       # TypeScript interfaces
│   └── public/          # Static assets
│
├── backend/             # Express.js REST API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── models/      # Mongoose schemas
│   │   ├── middleware/   # Auth & RBAC
│   │   └── lib/         # DB, JWT, password utils
│   └── .env.example     # Environment template
│
└── package.json         # Root: runs both via concurrently
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** (Atlas or local)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/Bhumit267/Illuvista.git
cd Illuvista
```

### 2. Install All Dependencies

```bash
npm run install:all
```

### 3. Configure Environment Variables

**Backend** — Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend** — Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run Both Servers

```bash
npm run dev
```

| Server | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login with credentials |
| `GET` | `/api/auth/me` | Get current session |
| `POST` | `/api/auth/logout` | Logout user |

### Artworks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/artworks` | List all artworks |
| `GET` | `/api/artworks/:id` | Get artwork by ID |
| `POST` | `/api/artworks` | Create artwork (auth) |
| `PUT` | `/api/artworks/:id` | Update artwork (auth) |
| `DELETE` | `/api/artworks/:id` | Delete artwork (auth) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get user's orders (auth) |
| `POST` | `/api/orders` | Create order (auth) |
| `PATCH` | `/api/orders/:id/status` | Update status (auth) |

---

## 🚢 Deployment

### Frontend → Vercel
1. Import repository on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add env variable: `NEXT_PUBLIC_API_URL` = your backend URL

### Backend → Render
1. Create **Web Service** on [render.com](https://render.com)
2. Set **Root Directory** to `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. Add env variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Buyer** | Browse gallery, purchase artworks, view orders |
| **Artist** | All Buyer perms + upload/manage own artworks, view sales |
| **Admin** | Full access: manage users, artworks, orders, reports |

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Bhumit267">Bhumit</a>
</p>
