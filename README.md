# 🏠 Homeverse — Full-Stack Real Estate Platform

A **modern, professional real estate platform** built as a high-quality portfolio project.

**Stack:** React + Vite + TailwindCSS + Framer Motion + Express.js

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Start dev servers (frontend + backend simultaneously)
```bash
npm run dev
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:3001      |
| API Health | http://localhost:3001/api/health |

---

## 📁 Project Structure

```
homeverse-app/
│
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── home/                # Homepage sections
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   ├── FeaturedProperties.jsx
│   │   │   │   ├── ServicesSection.jsx
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── AmenitiesSection.jsx
│   │   │   │   ├── PopularLocations.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── BlogSection.jsx
│   │   │   │   └── CTASection.jsx
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   ├── property/            # PropertyCard, SearchFilter, MortgageCalculator, CompareBar
│   │   │   ├── shared/              # SectionHeader, ScrollToTop
│   │   │   └── ui/                  # PageLoader
│   │   ├── pages/                   # Route pages
│   │   ├── hooks/                   # TanStack Query hooks
│   │   ├── store/                   # Zustand global state
│   │   ├── services/                # Axios API layer
│   │   ├── utils/                   # Helper functions
│   │   └── layouts/                 # MainLayout with page transitions
│   └── ...config files
│
├── server/                          # Express API
│   ├── routes/
│   │   ├── properties.js
│   │   ├── agents.js
│   │   └── inquiries.js
│   ├── controllers/
│   │   ├── propertiesController.js
│   │   ├── agentsController.js
│   │   └── inquiriesController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── data/                        # JSON mock database
│   │   ├── properties.json          # 8 properties
│   │   ├── agents.json              # 4 agents
│   │   └── inquiries.json           # Persisted inquiries
│   └── server.js
│
└── README.md
```

---

## 🌐 API Endpoints

| Method | Endpoint                          | Description                      |
|--------|-----------------------------------|----------------------------------|
| GET    | `/api/health`                     | Health check                     |
| GET    | `/api/properties`                 | All properties (with filters)    |
| GET    | `/api/properties/:id`             | Single property by ID or slug    |
| GET    | `/api/properties/featured`        | Featured properties              |
| GET    | `/api/properties/popular-locations` | City aggregation               |
| GET    | `/api/properties/stats`           | Platform statistics              |
| GET    | `/api/agents`                     | All agents                       |
| GET    | `/api/agents/:id`                 | Single agent with listings       |
| POST   | `/api/inquiry`                    | Submit a contact inquiry         |

### Query Parameters for `GET /api/properties`

| Param     | Example        | Description           |
|-----------|----------------|-----------------------|
| `type`    | `Apartment`    | Filter by type        |
| `status`  | `For Rent`     | Filter by status      |
| `city`    | `Chicago`      | Filter by city        |
| `minPrice`| `100000`       | Minimum price         |
| `maxPrice`| `500000`       | Maximum price         |
| `beds`    | `3`            | Minimum bedrooms      |
| `search`  | `luxury`       | Full-text search      |
| `sort`    | `price_asc`    | Sort order            |

---

## ✨ Features

### Frontend
- ⚡ Vite + React 18 with lazy-loaded routes
- 🎨 TailwindCSS with custom design tokens
- 🌙 Dark / Light mode (persisted)
- 💫 Framer Motion page transitions & scroll animations
- 🔍 Search + filter + sort properties
- 📊 Skeleton loading states
- ❤️ Favorites / wishlist (persisted in localStorage)
- ⚖️ Property comparison bar (up to 3)
- 📸 Swiper image gallery on property detail
- 🧮 Mortgage calculator with sliders
- 🔔 Toast notifications
- 📱 Fully responsive

### Backend
- 🛡️ Helmet security headers
- 🔄 CORS configured for Vite dev proxy
- 📝 Morgan request logging
- 💾 JSON file persistence for inquiries
- ✅ Input validation on POST endpoints

---

## 🛠️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, Vite, TailwindCSS, Framer Motion      |
| State     | Zustand (with localStorage persistence)         |
| Data      | TanStack Query v5 (caching + loading states)    |
| Forms     | React Hook Form                                 |
| Routing   | React Router v6                                 |
| UI        | Lucide React, Swiper, React Hot Toast           |
| Backend   | Node.js, Express.js                             |
| Data      | JSON files (no database required)               |

---

## 🔧 Customisation

### Add more properties
Edit `server/data/properties.json` — the API auto-picks up changes on restart.

### Add Mapbox integration
1. Get a free API key at [mapbox.com](https://mapbox.com)
2. Replace `pk.placeholder` in `PropertyDetailPage.jsx` with your key

### Deploy
- **Frontend:** `cd client && npm run build` → deploy `dist/` to Vercel/Netlify
- **Backend:** Deploy `server/` to Railway, Render, or Fly.io

---

## 📸 Screenshots

The project includes:
- A stunning hero section with animated floating cards
- Featured property grid with glassmorphism cards
- Full-screen property detail with Swiper gallery
- Mortgage calculator with live sliders
- Agent directory with stats
- Contact form with server-side persistence
- Dark mode toggle

---

*Built with ❤️ as a portfolio project — showcasing modern React architecture, clean API design, and premium UI/UX.*
