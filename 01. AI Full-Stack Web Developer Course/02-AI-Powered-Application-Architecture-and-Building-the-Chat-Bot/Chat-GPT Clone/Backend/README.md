<div align="center">

# 🤖 GPT-Clone Backend
### *Abduletif Assistant AI* — Server-Side Architecture

[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Framework-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI_API-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

*A modular, layered Express API powering a Gemini-driven AI coding assistant named **Abduletif**.*

</div>

---

## ✨ Overview

This is the backend service for **Chat-GPT Clone**, exposing a clean REST API that manages chat conversations and streams responses from **Google Gemini**. The codebase follows a strict **Routes → Controllers → Services** layering, keeping HTTP concerns, business logic, and data access fully decoupled.

The AI persona — **Abduletif** — is configured via a `systemInstruction` to behave as a focused, technical software-engineering assistant, gently redirecting off-topic chat back toward code, architecture, and debugging help.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| 🟢 Runtime | **Node.js** | JavaScript server runtime |
| 🚂 Framework | **Express.js** | Routing & middleware pipeline |
| 🗄️ Database | **MySQL** (`mysql2`) | Persistent storage via connection pooling |
| 🧠 AI Engine | **Google Gemini** (`@google/genai`) | Conversational AI responses |
| 🔐 Config | **dotenv** | Environment variable management |
| 🌍 CORS | **cors** | Cross-origin request handling |

---

## 📁 Project Structure

```text
GPT-Clone/
└── Backend/
    ├── index.js                        # App entry point — server + middleware setup
    ├── package.json                    # Dependencies, scripts, metadata
    │
    ├── db/                             # Database layer
    │   ├── db.config.js                #   MySQL pool & connection setup
    │   └── schema.sql                  #   Table definitions & seed schema
    │
    └── src/
        ├── api/                        # API routing layer
        │   ├── main.routes.js          #   Central router — mounts feature routes
        │   └── chat/                   #   💬 Chat feature module
        │       ├── chat.routes.js      #     /conversations, /conversation endpoints
        │       ├── controller/
        │       │   └── chat.controller.js   # HTTP request/response mapping
        │       └── service/
        │           └── chat.service.js      # Business logic, DB queries, Gemini calls
        │
        └── middleware/
            └── error-handler.js        # Centralized error-handling middleware
```

---

## 🏗️ Architecture Pattern

```
Request
   │
   ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Routes     │ ──▶ │ Controllers  │ ──▶ │  Services    │ ──▶ │  MySQL /     │
│ (chat.routes)│     │(chat.controller)│  │(chat.service)│     │  Gemini API  │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
       ▲                                                              │
       └──────────────────── JSON Response ◀────────────────────────┘
                          (via error-handler.js on failure)
```

**Layer responsibilities:**

| Layer | Responsibility |
|---|---|
| 🛣️ **Routes** | Define endpoints, bind HTTP verbs to controller methods |
| 🎮 **Controllers** | Parse requests, call services, shape HTTP responses |
| ⚙️ **Services** | Business logic, DB queries, Gemini API integration |
| 🧯 **Middleware** | Global error handling → consistent JSON error shape |

> 🔒 **Rule of thumb:** Controllers never touch the database or the AI SDK directly — that always goes through a service.

---

## 🧠 AI Persona — Abduletif

The Gemini integration is configured with a strict `systemInstruction`:

> *"Your name is Abduletif, an expert AI software engineering assistant. Always introduce yourself by name if asked. Your primary focus is coding, web development, debugging, and software architecture. If the user asks a non-technical or personal question, acknowledge it briefly through the lens of a developer or tech enthusiast, but gently steer the conversation back to how you can help them build, code, or solve technical problems today."*

This lives inside `chat.service.js`, where the Gemini client is initialized and called.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=18`
- A running MySQL instance
- A Google Gemini API key

### Installation

```bash
# 1. Navigate to the backend directory
cd GPT-Clone/Backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables (`.env`)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gpt_clone
GEMINI_API_KEY=your_gemini_api_key
```

### Database Setup

```bash
mysql -u root -p < db/schema.sql
```

### Run the Server

```bash
npm run dev     # development (with nodemon, if configured)
npm start       # production
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/conversations` | Fetch all conversations |
| `GET` | `/api/conversation/:id` | Fetch a single conversation with messages |
| `POST` | `/api/conversation` | Create a new conversation & get an AI reply |

> Endpoints are defined in `chat.routes.js` and mounted centrally via `main.routes.js`.

---

## 🧯 Error Handling

All errors flow through `middleware/error-handler.js`, guaranteeing a **consistent JSON error contract** across the API:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "status": 500
}
```

No raw stack traces or unhandled exceptions ever reach the client.

---

## 🗺️ Roadmap / Scaling Ideas

- [ ] Add request validation layer (e.g., `zod` or `express-validator`)
- [ ] Introduce rate limiting for the Gemini endpoint
- [ ] Add authentication/authorization (JWT-based sessions)
- [ ] Stream Gemini responses to the client (SSE)
- [ ] Add a `repository/` sub-layer between services and MySQL for query isolation
- [ ] Add automated tests (Jest/Supertest) per layer
- [ ] Add request logging middleware (e.g., `morgan`)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing **Routes → Controllers → Services** pattern
4. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">

Built with 🟢 Node.js, 🚂 Express, and 🧠 Gemini — powering **Abduletif**

</div>