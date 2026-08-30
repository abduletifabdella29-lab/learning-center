# 🎬 StreamFlix (Netflix clone)

<div align="center">

### 🍿 A Modern Netflix-Inspired Streaming Platform Built with React

A responsive movie streaming interface powered by the **TMDB API**, built to practice modern React development, API integration, reusable components, and responsive UI design.

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge\&logo=themoviedatabase\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-API-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

<br />

**🎬 Movies • 📺 TV Shows • 🔥 Trending • ⭐ Top Rated • 🎠 Carousels**

</div>

---

## 📌 About The Project

**StreamFlix** is a Netflix-inspired streaming platform built with **React + Vite** as a practical front-end development project.

The application connects to the **TMDB API** to retrieve movie and TV-show information and presents the content through a modern streaming-service interface.

The main goal of this project was to practice building a real-world React application with:

* ⚛️ Reusable React components
* 🔗 REST API integration
* 📡 Multiple API requests
* 📱 Responsive layouts
* 🎨 Interactive UI elements
* 🧠 React state and effect management
* 🗂️ Clean project architecture

---

## 🎯 Project Goals

The project was built with the following goals:

* 🎬 Build a modern streaming-platform interface
* ⚛️ Practice reusable React components
* 🔗 Work with external REST APIs
* ⚡ Handle multiple API requests efficiently
* 📱 Create responsive layouts for different devices
* 🪝 Improve React state and effect management
* 🗂️ Practice professional project organization

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🎬 Content

* 🖼️ Dynamic hero banner
* 🎞️ TMDB movie & TV data
* 📚 Multiple content categories
* 🔥 Trending movies
* 👑 Netflix Originals
* ⭐ Top-rated content
* 🎭 Genre-based sections

</td>

<td width="50%" valign="top">

### 🖥️ UI / UX

* 📱 Responsive design
* 🃏 Interactive movie cards
* 🎠 Horizontal sliders
* ✨ Hover animations
* 📌 Sticky navigation
* 🔍 Search toggle
* 👤 Profile menu
* 📲 Mobile-friendly interface

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| ⚛️ **React**        | UI development           |
| ⚡ **Vite**          | Development & build tool |
| 🎞️ **TMDB API**    | Movie & TV data          |
| 🔗 **Axios**        | API requests             |
| 🎠 **Swiper.js**    | Content carousels        |
| 🎨 **CSS Modules**  | Component-level styling  |
| ✨ **Lucide React**  | UI icons                 |
| 🔷 **React Icons**  | Additional icons         |
| ▲ **Vercel**        | Deployment               |
| 🐙 **Git & GitHub** | Version control          |

---

## 🧠 Application Architecture

StreamFlix follows a **component-based React architecture**, where major parts of the interface are separated into reusable components.

```text
                         👤 User
                           │
                           ▼
                  ┌─────────────────┐
                  │    React App    │
                  └────────┬────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
           🧭 Header               🎬 Banner
                │                     │
                └──────────┬──────────┘
                           ▼
                     📚 DisplayRow
                           │
                           ▼
                    📡 TMDB API
                           │
                           ▼
                      🎞️ Movie Data
                           │
                           ▼
                       🎠 SlideShow
                           │
                           ▼
                       🃏 MovieCard
```

This structure keeps the application organized and makes individual components easier to maintain and reuse.

---

## 📂 Project Structure

```text
01. Project - StreamFlix/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── Images/
│   │       └── # Logos and static images
│   │
│   ├── Components/
│   │   ├── Banner/
│   │   │   └── # Hero / banner section
│   │   │
│   │   ├── DisplayRow/
│   │   │   └── # API data and category rows
│   │   │
│   │   ├── Footer/
│   │   │   └── # Footer content
│   │   │
│   │   ├── Header/
│   │   │   └── # Navigation and user controls
│   │   │
│   │   ├── MovieCard/
│   │   │   └── # Individual movie cards
│   │   │
│   │   └── SlideShow/
│   │       └── # Swiper carousel
│   │
│   ├── Data/
│   │   └── data.js
│   │       └── # Local/static application data
│   │
│   ├── Utility/
│   │   ├── MovieInstance.js
│   │   │   └── # Axios configuration
│   │   │
│   │   └── requestUrls.js
│   │       └── # TMDB API endpoints
│   │
│   ├── App.jsx
│   │   └── # Main application component
│   │
│   ├── App.css
│   │   └── # Global styles
│   │
│   └── main.jsx
│       └── # React entry point
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔧 Core Implementation

## 01. 🔗 Axios API Layer

Instead of creating Axios requests throughout different components, StreamFlix uses a **centralized Axios instance**.

### `Utility/MovieInstance.js`

```js
import axios from "axios";

const movieInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export { movieInstance };
```

### Why?

This approach:

* ♻️ Keeps API configuration reusable
* 🧹 Keeps components cleaner
* 🔧 Makes future API changes easier
* 📦 Provides a centralized place for API configuration

---

## 02. 🎞️ TMDB Request Configuration

API endpoints are organized separately inside `requestUrls.js`.

```text
Utility/
├── MovieInstance.js
└── requestUrls.js
```

This separation keeps the application code cleaner and avoids repeating API routes inside UI components.

---

## 03. 🎨 Dynamic Hero Section

The banner loads **Netflix Original** content from TMDB when the application starts.

A random result is selected so the hero section can display different content between page loads.

```js
useEffect(() => {
    async function fetchBannerImage() {
        const request = await movieInstance.get(
            requestUrls.fetchNetflixOriginals
        );

        const randomMovie =
            request.data.results[
                Math.floor(
                    Math.random() * request.data.results.length
                )
            ];

        setBannerImage(randomMovie);
    }

    fetchBannerImage();
}, []);
```

### Banner Includes

* 🖼️ Dynamic backdrop
* 🎬 Movie/show title
* 📝 Short description
* ▶️ Action controls
* 🌑 Gradient overlay
* 📱 Responsive layout

---

## 04. ⚡ Multiple API Requests

StreamFlix uses `Promise.all()` to request multiple categories concurrently.

```js
const responses = await Promise.all([
    movieInstance.get(requestUrls.fetchTrending),
    movieInstance.get(requestUrls.fetchNetflixOriginals),
    movieInstance.get(requestUrls.fetchTopRatedMovies),
    movieInstance.get(requestUrls.fetchActionMovies),
    movieInstance.get(requestUrls.fetchComedyMovies),
    movieInstance.get(requestUrls.fetchHorrorMovies),
    movieInstance.get(requestUrls.fetchRomanceMovies),
    movieInstance.get(requestUrls.fetchDocumentaries)
]);
```

### 📡 Content Categories

| #  | Category             | Endpoint                |
| -- | -------------------- | ----------------------- |
| 01 | 🔥 Trending          | `fetchTrending`         |
| 02 | 👑 Netflix Originals | `fetchNetflixOriginals` |
| 03 | ⭐ Top Rated          | `fetchTopRatedMovies`   |
| 04 | 💥 Action            | `fetchActionMovies`     |
| 05 | 😂 Comedy            | `fetchComedyMovies`     |
| 06 | 👻 Horror            | `fetchHorrorMovies`     |
| 07 | ❤️ Romance           | `fetchRomanceMovies`    |
| 08 | 🌍 Documentaries     | `fetchDocumentaries`    |

Using `Promise.all()` allows these requests to run concurrently instead of waiting for each request individually.

---

## 05. 🎠 Swiper Movie Carousel

The `SlideShow` component uses **Swiper.js** to create horizontally scrollable content rows.

```text
DisplayRow
    │
    ▼
SlideShow
    │
    ├── Swiper
    │    ├── SwiperSlide
    │    ├── SwiperSlide
    │    ├── SwiperSlide
    │    └── ...
    │
    ▼
MovieCard
```

### 🎠 Carousel Experience

* 🖱️ Mouse dragging
* 👆 Touch/swipe gestures
* 📱 Mobile support
* 💻 Desktop support
* ↔️ Horizontal navigation
* 🎞️ Multiple cards per view

---

## 06. 🃏 Interactive Movie Card

Each movie is presented through a reusable `MovieCard` component.

The card provides additional information and controls when the user interacts with it.

### Card UI

```text
┌─────────────────────────┐
│                         │
│         POSTER          │
│                         │
│                         │
├─────────────────────────┤
│   ▶    +    ♥    ﹀     │
│                         │
│   HD     U/A 16+        │
│                         │
│   Action • Thriller     │
└─────────────────────────┘
```

The component keeps movie presentation consistent throughout the application.

---

## 07. 🧭 Smart Header

The navigation header changes its appearance when the user scrolls down the page.

```js
if (window.scrollY > 50) {
    setScrolled(true);
}
```

### Header Controls

* 🏠 Navigation
* 🔍 Search toggle
* 👤 Profile menu
* 📌 Sticky positioning
* 📜 Scroll detection

### 👤 Profile Menu

The profile dropdown contains common account actions:

* Account
* Help Center
* Sign Out

---

## 08. 📦 Local Data

Static application data is kept separately in:

```text
src/
└── Data/
    └── data.js
```

The `data.js` file allows reusable local data to be maintained independently from React components.

This helps keep components focused on **presentation and application logic** rather than static data definitions.

---

# 🔐 Environment Variables

The TMDB API key is stored using **Vite environment variables** instead of placing it directly inside the source code.

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

The key can then be accessed through:

```js
import.meta.env.VITE_TMDB_API_KEY
```

> ⚠️ **Important:** Never commit your real `.env` file or private credentials to GitHub.

Make sure `.env` is included in your `.gitignore` file.

---

# 🚀 Getting Started

Follow these steps to run StreamFlix locally.

## 📋 Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd "01. Project - StreamFlix"
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

---

# 📱 Responsive Design

StreamFlix is designed to provide a smooth experience across different screen sizes.

| Device          | Experience                                                     |
| --------------- | -------------------------------------------------------------- |
| 🖥️ **Desktop** | Large movie cards, navigation controls, and multi-card sliders |
| 💻 **Laptop**   | Adaptive content rows and responsive spacing                   |
| 📱 **Mobile**   | Touch-friendly sliders and optimized layouts                   |

The interface adapts its layout, spacing, and interactions according to the device size.

---

# ☁️ Deployment

The project is deployed using **Vercel** and connected to GitHub.

```text
🐙 GitHub Repository
        │
        ▼
     ▲ Vercel
        │
        ▼
  🔨 Build Project
        │
        ▼
   🚀 Production
```

This provides an automated deployment workflow whenever changes are pushed to the connected repository.

---

# 📚 What I Learned

Building StreamFlix helped me practice several important front-end development concepts:

* ⚛️ React component architecture
* 🪝 React Hooks
* 🔄 `useEffect()` and asynchronous operations
* 🔗 REST API integration
* 📡 Axios
* ⚡ `Promise.all()`
* 🎨 CSS Modules
* 🎠 Swiper.js
* 🔐 Vite environment variables
* 🧩 Reusable components
* 📱 Responsive design
* 🖱️ Interactive UI states
* 📜 Scroll event handling
* 🗃️ Project organization
* 🐙 Git & GitHub
* ☁️ Vercel deployment

---

# 🎯 Future Improvements

There are several features I would like to explore in future versions:

* 🔎 Full movie search functionality
* 🎬 Movie detail pages
* ▶️ Trailer/video integration
* 🔐 Authentication
* ❤️ Watchlist functionality
* 👤 User profiles
* 🌙 More UI customization
* 📄 Pagination / infinite scrolling

---

# ⭐ Project Status

🚧 **StreamFlix is an ongoing learning project.**

The current version focuses primarily on practicing **React, API integration, responsive UI, reusable components, and front-end architecture**.

---

<div align="center">

## 🍿 StreamFlix

**A Netflix-inspired React project built for learning, practice & growth.**

<br />

⭐ **If you like this project, consider giving the repository a star!**

</div>