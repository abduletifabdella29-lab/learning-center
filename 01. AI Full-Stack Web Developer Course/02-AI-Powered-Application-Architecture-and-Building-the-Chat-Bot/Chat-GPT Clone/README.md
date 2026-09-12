<div align="center">

# 🤖 Abduletif AI
### *Chat-GPT Clone* — Full-Stack AI Chat Application

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI_API-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

*A full-stack, component-driven ChatGPT-style application powered by Google Gemini — meet **Abduletif**, your AI software engineering assistant.*

</div>

---

## ✨ Overview

**Abduletif AI** is a complete full-stack chat application pairing a **React + Vite** frontend with a **Node.js + Express + MySQL** backend, wired to **Google Gemini** for AI responses. The project is split into two clean workspaces — `frontend/` and `Backend/` — each following its own strict architectural discipline:

- 🎨 **Frontend:** component-driven React UI, CSS Modules scoped per component
- 🚂 **Backend:** layered MVC — **Routes → Controller → Service** — with centralized error handling

The AI itself has a defined persona, **Abduletif**, a focused software-engineering assistant that gently redirects off-topic conversation back to code and architecture.

---

## 🗂️ Full Workspace Structure

```text
Chat-GPT Clone/
├── frontend/                       # React SPA (Vite)
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                 # App shell, state management & API messaging flow
│       ├── main.jsx                # React DOM entry point
│       ├── index.css               # Global styles & resets
│       └── Components/
│           ├── ChatHeader/         # Top navigation bar & branding
│           │   ├── ChatHeader.jsx
│           │   └── ChatHeader.module.css
│           ├── ChatInput/          # Message composer & send controls
│           │   ├── ChatInput.jsx
│           │   └── ChatInput.module.css
│           ├── ChatMessage/        # Individual message bubble (user/AI)
│           │   ├── ChatMessage.jsx
│           │   └── ChatMessage.module.css
│           ├── MessageList/        # Scrollable thread & auto-scroll
│           │   ├── MessageList.jsx
│           │   └── MessageList.module.css
│           └── Sidebar/            # Navigation & conversation history
│               ├── Sidebar.jsx
│               └── Sidebar.module.css
│
└── Backend/                        # Node.js & Express API server
    ├── index.js                    # Server entry point & middleware setup
    ├── package.json
    ├── db/
    │   ├── db.config.js            # MySQL connection pooling
    │   └── schema.sql              # Database tables & schema
    └── src/
        ├── api/
        │   ├── main.routes.js      # Central router aggregator
        │   └── chat/
        │       ├── chat.routes.js  # /conversations, /conversation endpoints
        │       ├── controller/
        │       │   └── chat.controller.js   # Request validation & response mapping
        │       └── service/
        │           └── chat.service.js      # Business logic, DB persistence, Gemini calls
        └── middleware/
            └── error-handler.js    # Global error response handling
```

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| ⚛️ Frontend Framework | **React** (Hooks) | Component logic & UI state |
| ⚡ Bundler | **Vite** | Dev server & builds |
| 🌐 HTTP Client | **Axios** | Frontend ↔ backend communication |
| 🎨 Icons | **Lucide React** | Iconography |
| 💅 Styling | **CSS Modules** + `index.css` | Scoped component styles |
| 🟢 Runtime | **Node.js** | Server runtime |
| 🚂 Backend Framework | **Express.js** | Routing & middleware |
| 🗄️ Database | **MySQL** (`mysql2`) | Persistent conversation storage |
| 🧠 AI Engine | **Google Gemini** (`@google/genai`) | Conversational AI responses |

---

## 🔁 End-to-End Request & Data Flow

```
┌──────────┐      ┌────────────────────┐      ┌───────────────┐
│   User    │ ───▶ │  React / Vite UI    │ ───▶ │ Axios (HTTP)   │
└──────────┘      └────────────────────┘      └───────┬───────┘
                                                          ▼
                                                ┌─────────────────┐
                                                │   Express API    │
                                                └────────┬────────┘
                                                          ▼
                                                ┌─────────────────┐
                                                │ Chat Controller  │
                                                └────────┬────────┘
                                                          ▼
                                                ┌─────────────────┐
                                    ┌──────────▶│  Chat Service     │◀──────────┐
                                    │           └─────────────────┘            │
                                    ▼                                          ▼
                          ┌───────────────────┐                    ┌────────────────────┐
                          │  MySQL             │                    │  Google Gemini SDK  │
                          │  (conversation +   │                    │  → Gemini Model     │
                          │   assistant reply) │                    │  → AI response       │
                          └───────────────────┘                    └────────────────────┘
                                    │                                          │
                                    └──────────────────┬──────────────────────┘
                                                        ▼
                                             ┌─────────────────┐
                                             │  JSON Response    │
                                             └────────┬────────┘
                                                        ▼
                                             ┌─────────────────┐
                                             │  React Message   │
                                             │  List (re-render) │
                                             └─────────────────┘
```

**Flow summary:**
1. User types a message in **`ChatInput`**
2. **Axios** sends it to the Express API
3. **`chat.controller.js`** validates and delegates to **`chat.service.js`**
4. The service **persists the user message to MySQL**, then calls the **Gemini SDK**
5. Gemini returns a response → service **persists the assistant reply**
6. Controller sends a JSON response back to the frontend
7. **`MessageList`** re-renders with the new conversation turn

---

## 🧩 Frontend Component Architecture

```
App.jsx
 ├── Sidebar          → conversation list, new chat, navigation
 ├── ChatHeader        → active chat title & top-level actions
 ├── MessageList        → renders <ChatMessage /> for each turn
 │    └── ChatMessage    → individual message bubble (role-aware styling)
 └── ChatInput          → text input, send button, keyboard handling
```

**Principles:** single responsibility per component · CSS Modules for style isolation · unidirectional data flow with state owned by `App.jsx`.

---

## 🏗️ Backend Layered Architecture

```
Routes  ──▶  Controllers  ──▶  Services  ──▶  MySQL / Gemini API
(chat.routes)  (chat.controller)  (chat.service)
```

| Layer | Responsibility |
|---|---|
| 🛣️ **Routes** | Define endpoints, bind HTTP verbs to controllers |
| 🎮 **Controllers** | Parse & validate requests, shape HTTP responses |
| ⚙️ **Services** | Business logic, DB queries, Gemini integration |
| 🧯 **Middleware** | Centralized error handling → consistent JSON errors |

> 🔒 **Rule:** Controllers never touch MySQL or the Gemini SDK directly — always through a service.

---

## 🧠 AI Persona — Abduletif

Configured via a strict Gemini `systemInstruction` inside `chat.service.js`:

> *"Your name is Abduletif, an expert AI software engineering assistant. Always introduce yourself by name if asked. Your primary focus is coding, web development, debugging, and software architecture. If the user asks a non-technical or personal question, acknowledge it briefly through the lens of a developer or tech enthusiast, but gently steer the conversation back to how you can help them build, code, or solve technical problems today."*

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=18`
- A running MySQL instance
- A Google Gemini API key

### 1. Clone & Install

```bash
git clone <repo-url> "Chat-GPT Clone"
cd "Chat-GPT Clone"

# Backend
cd Backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Create `Backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=abduletif_ai
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Set Up the Database

```bash
cd Backend
mysql -u root -p < db/schema.sql
```

### 4. Run Both Servers

```bash
# Terminal 1 — Backend
cd Backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs at **`http://localhost:5173`**, proxying API calls to the backend at **`http://localhost:5000`**.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/conversations` | Fetch all conversations |
| `GET` | `/api/conversation/:id` | Fetch a single conversation with full message history |
| `POST` | `/api/conversation` | Send a message → persist it → get Abduletif's AI reply |

---

## 🧯 Error Handling

All backend errors pass through `middleware/error-handler.js`, returning a consistent shape:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "status": 500
}
```

---

## 🗺️ Roadmap / Scaling Ideas

**Frontend**
- [ ] Extract Axios calls into a `services/api.js` layer
- [ ] Add streaming AI responses (SSE) in `ChatMessage`
- [ ] Dark/light theme via CSS variables
- [ ] Component tests (Vitest + React Testing Library)

**Backend**
- [ ] Add request validation (`zod` / `express-validator`)
- [ ] Rate limit the Gemini endpoint
- [ ] JWT-based authentication
- [ ] Stream Gemini responses via SSE to match frontend
- [ ] Add a `repository/` layer between services and MySQL
- [ ] Automated tests (Jest + Supertest)
- [ ] Request logging (`morgan`)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Respect existing architecture: component isolation on the frontend, Routes → Controller → Service on the backend
4. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">

Built with ⚛️ React, 🚂 Express, 🗄️ MySQL, and 🧠 Gemini — powering **Abduletif**

</div>