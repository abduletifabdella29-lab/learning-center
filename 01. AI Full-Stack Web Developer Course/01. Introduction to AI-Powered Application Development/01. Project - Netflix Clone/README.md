🎬 StreamFlix — Netflix Clone

<div align="center">  <h3>🍿 A modern Netflix-inspired streaming platform built with React</h3>  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p></div>---

📌 About The Project

StreamFlix is a Netflix-inspired streaming platform built with React + Vite as a practical front-end development project.

The application connects to the TMDB API to retrieve movie and TV-show information and presents the content through a modern streaming-service interface.

The main goal of this project was to practice building a real-world React application with reusable components, API integration, responsive layouts, interactive UI elements, and a clean project architecture.

🎯 Project Goals

- Build a modern streaming-platform interface
- Practice reusable React components
- Work with external REST APIs
- Handle multiple API requests efficiently
- Create responsive layouts for different devices
- Improve React state and effect management
- Practice professional project organization

---

✨ Features

<table>
<tr>
<td width="50%">🎬 Content

- Dynamic hero banner
- TMDB movie & TV data
- Multiple content categories
- Trending movies
- Netflix Originals
- Top-rated content
- Genre-based sections

</td><td width="50%">🖥️ UI / UX

- Responsive design
- Interactive movie cards
- Horizontal sliders
- Hover animations
- Sticky navigation
- Search toggle
- Profile menu
- Mobile-friendly interface

</td>
</tr>
</table>---

🛠️ Tech Stack

<div align="center">Technology| Purpose
⚛️ React| UI development
⚡ Vite| Development & build tool
🎞️ TMDB API| Movie & TV data
🔗 Axios| API requests
🎠 Swiper.js| Content carousels
🎨 CSS Modules| Component-level styling
✨ Lucide React| UI icons
🔷 React Icons| Additional icons
▲ Vercel| Deployment
🐙 GitHub| Version control

</div>---

🧠 Application Architecture

StreamFlix follows a component-based React architecture where each major part of the interface is separated into its own component.

User
 │
 ▼
┌──────────────────────┐
│      React App       │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
  Header       Banner
     │           │
     └─────┬─────┘
           ▼
      DisplayRow
           │
           ▼
     TMDB API Layer
           │
           ▼
      Movie Data
           │
           ▼
      SlideShow
           │
           ▼
       MovieCard

---

📂 Project Structure

01. Project - StreamFlix/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── Images/              # Logos and static images
│   │
│   ├── Components/
│   │   ├── Banner/              # Hero/banner section
│   │   ├── DisplayRow/          # API data & category rows
│   │   ├── Footer/              # Footer content
│   │   ├── Header/              # Navigation & user controls
│   │   ├── MovieCard/           # Individual movie cards
│   │   └── SlideShow/            # Swiper carousel
│   │
│   ├── Data/
│   │   └── data.js              # Local/static application data
│   │
│   ├── Utility/
│   │   ├── MovieInstance.js     # Axios configuration
│   │   └── requestUrls.js       # TMDB API endpoints
│   │
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles
│   └── main.jsx                 # React entry point
│
├── .env
├── package.json
├── vite.config.js
└── README.md

---

🔧 Core Implementation

01. 🔗 Axios API Layer

Instead of creating Axios requests throughout different components, StreamFlix uses a centralized Axios instance.

// Utility/MovieInstance.js

import axios from "axios";

const movieInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export { movieInstance };

This keeps the API configuration reusable and makes future API changes easier to manage.

---

02. 🎞️ TMDB Request Configuration

API endpoints are organized separately inside "requestUrls.js".

Utility/
├── MovieInstance.js
└── requestUrls.js
This separation keeps the application code cleaner and avoids repeating API routes inside UI components.

---

03. 🎨 Dynamic Hero Section

The banner loads Netflix Original content from TMDB when the application starts.

A random result is selected so the hero section can display different content between page loads.

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

Banner includes:

- 🖼️ Dynamic backdrop
- 🎬 Movie/show title
- 📝 Short description
- ▶️ Action controls
- 🌑 Gradient overlay
- 📱 Responsive layout

---

04. ⚡ Multiple API Requests

StreamFlix uses "Promise.all()" to request multiple categories concurrently.

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

📡 Content Categories

#| Category| Endpoint
01| 🔥 Trending| "fetchTrending"
02| 👑 Netflix Originals| "fetchNetflixOriginals"
03| ⭐ Top Rated| "fetchTopRatedMovies"
04| 💥 Action| "fetchActionMovies"
05| 😂 Comedy| "fetchComedyMovies"
06| 👻 Horror| "fetchHorrorMovies"
07| ❤️ Romance| "fetchRomanceMovies"
08| 🌍 Documentaries| "fetchDocumentaries"

---

05. 🎠 Swiper Movie Carousel

The "SlideShow" component uses Swiper.js to create horizontally scrollable content rows.

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

Carousel experience

- 🖱️ Mouse dragging
- 👆 Touch/swipe gestures
- 📱 Mobile support
- 💻 Desktop support
- ↔️ Horizontal navigation
- 🎞️ Multiple cards per view

---

06. 🃏 Interactive Movie Card

Each movie is presented through a reusable "MovieCard" component.

The card provides additional information and controls when the user interacts with it.

Card UI

┌─────────────────────┐
│                     │
│      POSTER         │
│                     │
│                     │
├─────────────────────┤
│  ▶  +  ♥  ﹀        │
│                     │
│  HD   U/A 16+       │
│                     │
│  Action • Thriller  │
└─────────────────────┘

The component is designed to keep movie presentation consistent throughout the application.

---

07. 🧭 Smart Header

The navigation header changes its appearance when the user scrolls down the page.

if (window.scrollY > 50) {
    setScrolled(true);
}

Header controls

- 🏠 Navigation
- 🔍 Search toggle
- 👤 Profile menu
- 📌 Sticky positioning
- 📜 Scroll detection

The profile dropdown contains common account actions such as:

Account
Help Center
Sign Out

---

08. 📦 Local Data

Static application data is kept separately in:

src/
└── Data/
    └── data.js

The "data.js" file allows reusable local data to be maintained independently from the React components.

This helps keep components focused on presentation and application logic rather than static data definitions.

---

🔐 Environment Variables

The TMDB API key is stored using Vite environment variables instead of placing it directly inside the source code.

Create a ".env" file in the project root:

VITE_TMDB_API_KEY=your_tmdb_api_key_here

The key can then be accessed through:

import.meta.env.VITE_TMDB_API_KEY

«⚠️ Never commit your real ".env" file or private credentials to GitHub.»

---

🚀 Getting Started

Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

---

📥 Installation
1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Open the project

cd "01. Project - StreamFlix"

3. Install dependencies

npm install

4. Configure environment variables

Create:

.env

Then add:

VITE_TMDB_API_KEY=your_tmdb_api_key_here

5. Start the development server

npm run dev

Open the local URL provided by Vite in your browser.

---

📱 Responsive Design

StreamFlix is designed to work across different screen sizes.

<table>
<tr>
<th>Device</th>
<th>Experience</th>
</tr>
<tr>
<td>🖥️ Desktop</td>
<td>Large movie cards, navigation controls and multi-card sliders</td>
</tr>
<tr>
<td>💻 Laptop</td>
<td>Adaptive content rows and responsive spacing</td>
</tr>
<tr>
<td>📱 Mobile</td>
<td>Touch-friendly sliders and optimized layouts</td>
</tr>
</table>---

☁️ Deployment

The project is deployed using Vercel and connected to GitHub.

GitHub Repository
       │
       ▼
    Vercel
       │
       ▼
   Build Project
       │
       ▼
   Production

This provides an automated deployment workflow whenever changes are pushed to the connected repository.

---

📚 What I Learned

Building StreamFlix helped me practice several important front-end development concepts:

- ⚛️ React component architecture
- 🪝 React Hooks
- 🔄 "useEffect()" and asynchronous operations
- 🔗 REST API integration
- 📡 Axios
- ⚡ "Promise.all()"
- 🎨 CSS Modules
- 🎠 Swiper.js
- 🔐 Vite environment variables
- 🧩 Reusable components
- 📱 Responsive design
- 🖱️ Interactive UI states
- 📜 Scroll event handling
- 🗃️ Project organization
- 🐙 Git & GitHub
- ☁️ Vercel deployment

---

🎯 Future Improvements

Some features I would like to explore in future versions:

- 🔎 Full movie search functionality
- 🎬 Movie detail pages
- ▶️ Trailer/video integration
- 🔐 Authentication
- ❤️ Watchlist functionality
- 👤 User profiles
- 🌙 More UI customization
- 📄 Pagination / infinite scrolling

---

<div align="center">🍿 StreamFlix

A Netflix-inspired React project built for learning, practice & growth.

<br>⭐ If you like the project, consider giving the repository a star!

</div>