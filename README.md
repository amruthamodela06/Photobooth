# Photobooth

A desktop photo booth application built with Electron, React, and Node.js.

## Features

- **Photo Strips** — Choose between 3-cut or 4-cut strip layouts
- **Filters** — Original, B&W, Soft, Golden, Airy, Moody, Dreamy, Film
- **Frames** — 19 frame styles including solids, gradients, and patterns
- **Stickers** — 30 emoji stickers with drag, drop, and resize support
- **Custom Text** — Add text to your strip with 8 fonts, custom colors, and alignment options
- **High-Res Download** — Exports at 3x scale for print quality

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop | Electron |
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Image Export | html2canvas |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) running locally on port 27017

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/amruthamodela06/Photobooth.git
cd Photobooth
```

### 2. Install dependencies

```bash
# Root dependencies (Electron, Express, etc.)
npm install

# Client dependencies (React, Vite, etc.)
cd client && npm install && cd ..
```

### 3. Start MongoDB

Make sure MongoDB is running on your machine:

```bash
mongod
```

### 4. Run the app

```bash
npm start
```

This starts the Express server (port 5000), Vite dev server (port 5173), and Electron together.

## Project Structure

```
Photobooth/
├── main.js                  # Electron entry point
├── package.json
├── client/                  # React frontend
│   └── src/
│       ├── App.jsx
│       ├── screens/         # WelcomeScreen, LayoutSelection, Capture, Customize
│       ├── components/      # CameraFeed, PhotoStrip, FilterDrawer
│       └── utils/           # filters.js, layouts.js, assets.js
└── server/                  # Express backend
    ├── index.js
    ├── models/              # Session, Settings
    └── routes/              # capture, settings
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the full app (server + client + Electron) |
| `npm run server` | Run the Express server only |
| `npm run client` | Run the Vite dev server only |
| `npm run build` | Build the React client for production |
| `npm run dist` | Package the app as a distributable |
