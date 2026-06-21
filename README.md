<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3c72,50:2a5298,100:00c9a7&height=220&section=header&text=Homeverse&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Modern%20Full-Stack%20Real%20Estate%20%26%20Property%20Discovery%20Platform&descAlignY=60&descSize=18" width="100%" />

<br/>

<p>
  <img src="https://img.shields.io/badge/FRONTEND-REACT%20+%20VITE-2A5298?style=for-the-badge&logo=react&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/BACKEND-EXPRESS.JS-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/ROUTING-REACT%20ROUTER-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/UI-TAILWINDCSS-00C9A7?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=2d2d2d" />
</p>

<p>
  <img src="https://img.shields.io/badge/STATE-ZUSTAND-1e3c72?style=for-the-badge&labelColor=555555" />
  <img src="https://img.shields.io/badge/DATA-TANSTACK%20QUERY-FF4154?style=for-the-badge&labelColor=555555" />
  <img src="https://img.shields.io/badge/ANIMATION-FRAMER%20MOTION-0055FF?style=for-the-badge&labelColor=555555" />
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-4CAF50?style=for-the-badge&labelColor=555555" />
</p>

<br/>

**[🌐 Live Demo](https://statuesque-pasca-fd6143.netlify.app/)** &nbsp;·&nbsp; **[📖 Docs](#-quick-start)** &nbsp;·&nbsp; **[🐛 Report Bug](#)** &nbsp;·&nbsp; **[✨ Request Feature](#)**

</div>

---

## 📖 About the Project

> **Homeverse** is a modern, full-stack real estate platform built with **React, Vite, and Express.js** — designed to deliver a polished, fast, and visually rich property discovery experience with real search/filtering, comparison tools, and a working contact pipeline.

Most real estate demo sites are static mockups with no real data flow. **Homeverse** solves this with a genuine client–server architecture: a React + Vite frontend talking to an Express REST API, backed by a JSON data layer that behaves like a real database (filtering, sorting, persistence) without requiring one.

This project was built as a **portfolio-grade application** to demonstrate production-style frontend architecture — TanStack Query for data fetching, Zustand for state, React Hook Form for validation, and Framer Motion for page-level animation — paired with a clean, modular Express backend.

<details>
<summary>📸 Screenshots &nbsp;—&nbsp; click to expand</summary>

<br/>

| Page | Preview |
|------|---------|
| 🖥️ Homepage Hero | Animated floating cards over a glassmorphism hero section |
| 🏘️ Featured Properties | Glass property cards with hover lift and image reveal |
| 🏡 Property Detail | Full-screen Swiper gallery + sticky mortgage calculator |
| 👤 Agent Directory | Agent profiles with stats and active listings |

</details>

---

## ✨ Features

<details open>
<summary>🏠 &nbsp; Property Discovery</summary>

<br/>

- 🔍 **Search, filter & sort** — by type, status, city, price range, and bedroom count
- ⭐ **Featured properties** — curated highlight grid on the homepage
- 📍 **Popular locations** — city-level aggregation of available listings
- 📸 **Swiper image gallery** — full-screen property photo browsing
- ❤️ **Favorites / wishlist** — persisted locally across sessions
- ⚖️ **Property comparison** — compare up to 3 listings side-by-side
- 🧮 **Mortgage calculator** — interactive sliders for live payment estimates

</details>

<details>
<summary>🎨 &nbsp; User Experience</summary>

<br/>

- 🌙 **Dark / Light mode** — persisted theme preference
- 💫 **Page transitions & scroll animations** — Framer Motion throughout
- 📊 **Skeleton loading states** — smooth perceived performance
- 🔔 **Toast notifications** — instant feedback on actions
- 📱 **Fully responsive** — desktop, tablet, and mobile

</details>

<details>
<summary>⚙️ &nbsp; Technical Highlights</summary>

<br/>

- 🧩 **Reusable component architecture** — organised by domain (home, property, layout, shared, ui)
- 🪝 **TanStack Query hooks** — caching, loading, and error states out of the box
- 🌐 **Centralised Axios API layer** — abstracted service functions
- 🗃️ **Modular Express backend** — routes → controllers → middleware separation
- 💾 **JSON file persistence** — inquiries are actually written to disk, not just logged
- ✅ **Server-side input validation** — on all POST endpoints

</details>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | UI component library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tooling & dev server |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Client-side routing |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Page transitions & scroll animation |

### Backend

| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | JavaScript server runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | REST API framework |

### State, Data & Forms

| Library | Purpose |
|---------|---------|
| ![Zustand](https://img.shields.io/badge/Zustand-1e3c72?style=flat-square) | Global state (localStorage-persisted) |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | Server-state caching & fetching |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) | Form state & validation |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP client |

### UI & Dev Tools

| Tool | Purpose |
|------|---------|
| ![Lucide React](https://img.shields.io/badge/Lucide_React-00C9A7?style=flat-square) | Icon library |
| ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) | Image gallery carousel |
| ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF4747?style=flat-square) | Toast notifications |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | Version control |

---

## 🏗️ Architecture

```
User
  │
  ▼
Homepage → Search & Filter → Property Listings → Property Detail
  │                                                      │
  ▼                                                      ▼
Agent Directory ←──────────── Compare / Favorites    Mortgage Calculator
  │
  ▼
Contact / Inquiry Form
  │
  ▼
Express REST API (routes → controllers → middleware)
  │
  ▼
JSON Data Layer (properties / agents / inquiries)
  │
  ▼
Response Returned to Client
```

---

## 📂 Project Structure

```bash
homeverse-app/
│
├── 📁 client/                          # React + Vite frontend
│   └── src/
│       ├── 📁 components/
│       │   ├── home/                  # HeroSection, StatsSection, FeaturedProperties,
│       │   │                            ServicesSection, AboutSection, AmenitiesSection,
│       │   │                            PopularLocations, TestimonialsSection,
│       │   │                            BlogSection, CTASection
│       │   ├── layout/                # Navbar, Footer
│       │   ├── property/              # PropertyCard, SearchFilter,
│       │   │                            MortgageCalculator, CompareBar
│       │   ├── shared/                # SectionHeader, ScrollToTop
│       │   └── ui/                    # PageLoader
│       │
│       ├── 📁 pages/                  # Route-level page components
│       ├── 📁 hooks/                  # TanStack Query hooks
│       ├── 📁 store/                  # Zustand global state
│       ├── 📁 services/               # Axios API layer
│       ├── 📁 utils/                  # Helper functions
│       └── 📁 layouts/                # MainLayout with page transitions
│
└── 📁 server/                          # Express REST API
    ├── 📁 routes/                      # properties.js, agents.js, inquiries.js
    ├── 📁 controllers/                 # propertiesController, agentsController, inquiriesController
    ├── 📁 middleware/                  # errorHandler.js
    ├── 📁 data/                        # properties.json, agents.json, inquiries.json
    └── server.js
```

### Folder Reference

| Folder | Purpose |
|--------|---------|
| `client/components/` | Reusable UI components, organised by domain |
| `client/pages/` | Application route pages |
| `client/hooks/` | TanStack Query data-fetching hooks |
| `client/store/` | Zustand state slices |
| `client/services/` | Centralised Axios API functions |
| `server/routes/` | Express route definitions |
| `server/controllers/` | Request handling logic |
| `server/data/` | JSON mock database |

---

## 🔌 API Endpoints

<details open>
<summary>🏠 Properties</summary>

```http
GET    /api/properties                  # All properties (supports filters)
GET    /api/properties/:id              # Single property by ID or slug
GET    /api/properties/featured         # Featured properties
GET    /api/properties/popular-locations # City aggregation
GET    /api/properties/stats            # Platform statistics
```

</details>

<details>
<summary>👤 Agents</summary>

```http
GET    /api/agents                      # All agents
GET    /api/agents/:id                  # Single agent with their listings
```

</details>

<details>
<summary>📩 Inquiries & Health</summary>

```http
POST   /api/inquiry                     # Submit a contact inquiry
GET    /api/health                      # API health check
```

</details>

<details>
<summary>🔎 Query Examples</summary>

```bash
GET /api/properties?type=Apartment&status=For+Rent&city=Chicago

GET /api/properties?minPrice=100000&maxPrice=500000&beds=3&sort=price_asc

GET /api/properties?search=luxury
```

</details>

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Required |
|------|---------|----------|
| Node.js | ≥ 18.x | ✅ Always |
| npm | ≥ 9.x | ✅ Always |

---

## ⚙️ Installation

**Step 1 — Clone the repository**

```bash
git clone <your-repo-url>
cd homeverse-app
```

**Step 2 — Install all dependencies**

```bash
npm run install:all
```

**Step 3 — Run the project (frontend + backend simultaneously)**

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| ✅ Frontend | http://localhost:5173 |
| ✅ Backend | http://localhost:3001 |
| ✅ API Health | http://localhost:3001/api/health |

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| 🚀 **Production (Live)** | **[statuesque-pasca-fd6143.netlify.app](https://statuesque-pasca-fd6143.netlify.app/)** |
| 💻 Local Frontend | http://localhost:5173 |
| 🔌 Local Backend API | http://localhost:3001/api |

---

## 🔧 Customisation

### Add more properties
Edit `server/data/properties.json` — the API auto-picks up changes on restart.

### Add Mapbox integration
1. Get a free API key at [mapbox.com](https://mapbox.com)
2. Replace `pk.placeholder` in `PropertyDetailPage.jsx` with your key

### Deploy
- **Frontend:** `cd client && npm run build` → deploy `dist/` to Netlify/Vercel
- **Backend:** Deploy `server/` to Railway, Render, or Fly.io

---

## ⚡ Performance Optimisations

| Optimisation | Description |
|---------------|-------------|
| ⚡ Lazy-loaded routes | Route-level code splitting via Vite |
| 🪝 TanStack Query caching | Avoids redundant network requests |
| 📊 Skeleton loading states | Smooth perceived performance during fetches |
| 🌐 Centralised API layer | Single source of truth for all HTTP calls |
| 🛡️ Helmet security headers | Hardened Express response headers |
| 📝 Morgan request logging | Request visibility during development |
| 🧹 Clean modular architecture | routes → controllers → middleware separation |

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Keeping property data realistic without a database | Built a JSON data layer with real filtering, sorting, and persisted inquiries |
| Managing server-state (loading/error/cache) cleanly | Adopted TanStack Query for all data-fetching hooks |
| Avoiding prop-drilling across deeply nested sections | Used Zustand for global state (favorites, compare list, theme) |
| Keeping the codebase scalable across home/property/layout domains | Organised components by domain rather than by type |

---

## 🌟 Key Highlights

| Highlight | Detail |
|-----------|--------|
| 🎨 **Modern UI/UX** | Glassmorphism property cards, animated hero, dark mode |
| 🧩 **Domain-organised architecture** | Components grouped by feature, not just type |
| 🔍 **Real filtering & search** | Server-side query params, not client-side mock filtering |
| ⚖️ **Comparison & favorites** | Genuinely useful, persisted user tools |
| 🌐 **Structured REST API** | routes → controllers → middleware, with input validation |
| ⚡ **Performance-first** | Lazy routes, query caching, skeleton states |

---

## 🎯 Skills Demonstrated

`Full-Stack Development` &nbsp;·&nbsp; `React Architecture` &nbsp;·&nbsp; `REST API Design` &nbsp;·&nbsp; `Server-State Management (TanStack Query)` &nbsp;·&nbsp; `Global State (Zustand)` &nbsp;·&nbsp; `Form Validation` &nbsp;·&nbsp; `Animation Engineering (Framer Motion)` &nbsp;·&nbsp; `Responsive UI/UX`

---

## 🗺️ Roadmap

- [ ] 🗺️ Live Mapbox integration for property locations
- [ ] 🔐 Authentication & saved searches
- [ ] 📅 Property viewing/booking scheduler
- [ ] 💳 Payment / deposit integration
- [ ] 📊 Agent-side admin dashboard
- [ ] 🗄️ Migrate JSON data layer to a real database

---

## 🤝 Contributing

Contributions, feature suggestions, and pull requests are always welcome!

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'feat: add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

No license file is currently included in this repository — add a `LICENSE` file (MIT is a common choice for portfolio projects) before treating this as open source.

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ as a portfolio project**

*Demonstrating expertise in:*

`Full-Stack Development` &nbsp;·&nbsp; `React Architecture` &nbsp;·&nbsp; `REST APIs` &nbsp;·&nbsp; `Responsive Design` &nbsp;·&nbsp; `Modern UI/UX`

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-00C9A7?style=for-the-badge&logo=netlify&logoColor=white)](https://statuesque-pasca-fd6143.netlify.app/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3c72,50:2a5298,100:00c9a7&height=120&section=footer" width="100%"/>

**⭐ Star this repo if you found it useful — it helps more than you think! ⭐**

</div>
