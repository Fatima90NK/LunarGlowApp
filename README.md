# Lunar Glow 🌙

Lunar Glow is a React + Node.js application that shows the current moon phase for your location, along with moonrise and moonset times. The app stores moon data in MongoDB to avoid repeated API calls and improve performance.

## Features

- Detects your location using browser geolocation.
- Fetches moon phase, moonrise, and moonset for your location.
- Displays the correct moon phase image with a description.
- Caches moon data in MongoDB for each day to reduce API requests.
- Sidebar UI for quick access to lunar information.

## Tech Stack

- **Frontend**: React (App.jsx)  
- **Backend**: Node.js + Express (app.js)  
- **Database**: MongoDB (running in Docker)  
- **External API**: Visual Crossing Weather API for moon data  

## Project Structure

<pre> ```text MoonPhaseProject/ ├─ backend/ │ ├─ app.js # Express backend server │ ├─ routes/ │ │ ├─ moon.js # Moon API endpoint │ │ ├─ index.js │ │ └─ funfacts.js │ └─ database.js # MongoDB connection ├─ frontend/ │ ├─ src/ │ │ ├─ App.jsx # React main app │ │ └─ LocationInfo.jsx │ └─ package.json ├─ package.json # Root (optional if separate) └─ README.md ``` </pre>

## Setup Instructions

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install

**Frontend:**

```bash
cd frontend
npm install
```

### 2. Start MongoDB

Using Docker:

```bash
docker run -d -p 27017:27017 --name moon-mongo mongo
```

Verify MongoDB is running:

```bash
docker ps
```

### 3. Start Backend Server

```bash
cd backend
nodemon app.js
```

You should see:

```
Server running on http://localhost:5000
```

### 4. Start Frontend

```bash
cd frontend
npm start
```

React will open in your browser at `http://localhost:3000`. It fetches data from `http://localhost:5000/api/moon/:lat/:lon`.

### 5. Using the App

1. Allow location access in your browser.
2. The app will fetch moon data for your location.
3. Sidebar shows moon phase description.
4. Main screen shows moon phase image, moonrise, and moonset.

### 6. Notes

* Moon data is cached in MongoDB by **latitude, longitude, and date**, so each day’s data is only fetched once.
* If you restart MongoDB, old cached data is lost.

### 7. Future Improvements Plan

* Use **Docker Compose** to run backend + MongoDB together.
* Deploy frontend and backend together (backend serves React build).
* Add **user accounts** to store favorite locations.
* Use **machine learning** to predict moonrise/set for future dates.
* Add **Fun facts Moon in the sidebar** for educational purpose.

### License

© 2025 FatimaNK90. All rights reserved.  

This repository is for **educational and personal use only**. You may view and study the code, but **you may not copy, distribute, modify, or use it for commercial purposes** without explicit written permission from the author.


