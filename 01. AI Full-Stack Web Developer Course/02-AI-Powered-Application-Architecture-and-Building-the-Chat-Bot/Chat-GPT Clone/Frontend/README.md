<div align="center">

# 💬 Chat-GPT-Clone

### A sleek, full-stack AI chat application built with React

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

*A modern, component-driven ChatGPT-style interface — fast, minimal, and built to scale.*

</div>

---

## ✨ Overview

**Chat-GPT-Clone** is a full-stack AI chat application whose front end is built entirely on **React functional components and hooks**, bundled with **Vite** for near-instant dev startup and HMR. The UI is composed of small, isolated, reusable components — each scoped with its own **CSS Module** — making the codebase easy to read, test, and extend.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| ⚛️ UI Framework | **React** (Hooks: `useState`, `useEffect`, `useRef`) | Component logic & state |
| ⚡ Bundler | **Vite** | Dev server & production builds |
| 🌐 HTTP Client | **Axios** | API communication with backend |
| 🎨 Icons | **Lucide React** | Lightweight, consistent iconography |
| 💅 Styling | **CSS Modules** + global `index.css` | Scoped, collision-free component styles |

---

## 📁 Project Structure

```text
Chat-GPT Clone/
└──frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx                     # Root component — app shell & layout
        ├── main.jsx                    # React entry point
        ├── index.css                   # Global styles & resets
        └── Components/
            ├── ChatHeader/
            │   ├── ChatHeader.jsx         # Top bar — title, actions, branding
            │   └── ChatHeader.module.css
            ├── ChatInput/
            │   ├── ChatInput.jsx          # Message composer & send controls
            │   └── ChatInput.module.css
            ├── ChatMessage/
            │   ├── ChatMessage.jsx        # Single message bubble (user/AI)
            │   └── ChatMessage.module.css
            ├── MessageList/
            │   ├── MessageList.jsx        # Scrollable conversation thread
            │   └── MessageList.module.css
            └── Sidebar/
                ├── Sidebar.jsx            # Conversation history & navigation
                └── Sidebar.module.css
```

> 🗂️ **Convention:** every component lives in its own folder alongside a co-located `*.module.css` file — no shared style leakage, no naming collisions.

---

## 🧩 Component Architecture

```
App.jsx
 ├── Sidebar          → conversation list, new chat, navigation
 ├── ChatHeader        → active chat title & top-level actions
 ├── MessageList        → renders <ChatMessage /> for each turn
 │    └── ChatMessage    → individual message bubble (role-aware styling)
 └── ChatInput          → text input, send button, keyboard handling
```

**Design principles followed:**
- 🧠 **Single responsibility** — each component owns one visual/functional concern
- 🔒 **Scoped styling** — CSS Modules prevent global namespace pollution
- 🔁 **Unidirectional data flow** — state lives in `App.jsx`, passed down via props
- 🪶 **Minimal dependencies** — no heavy state libraries; hooks are enough at this scale

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=18`
- npm 

### Installation

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **`http://localhost:5173`** by default.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔌 API Integration

All backend communication is handled via **Axios**. A typical request flow:

```js
// Example: sending a chat message
const response = await axios.post("/api/chat", {
  message: userInput,
  conversationId,
});
```

> 💡 Tip: Centralize Axios calls in a dedicated `api/` or `services/` module as the app grows, so components stay presentation-focused.

---

## 🗺️ Roadmap / Scaling Ideas

- [ ] Extract Axios logic into a `services/api.js` layer
- [ ] Introduce a `Context` or lightweight state manager (Zustand) as chat state grows
- [ ] Add streaming response support (SSE / WebSockets) in `ChatMessage`
- [ ] Add dark/light theme toggle via CSS variables
- [ ] Component-level unit tests (Vitest + React Testing Library)
- [ ] Extract shared UI primitives (Button, Avatar, Spinner) into a `common/` folder

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

<div align="center">

Made with ⚛️ React ☕ the Chat-GPT-Clone 

</div>