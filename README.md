# AI Code Review Platform

## Overview

This project is a full-stack AI-powered code review platform. It allows users to input code in a web interface and receive detailed, constructive feedback from an AI reviewer, powered by Google Gemini. The platform consists of a React frontend and a Node.js/Express backend.

---

## Features

- **AI Code Review**: Get instant, detailed code reviews and suggestions.
- **Modern UI**: React-based interface with live code editing and markdown-rendered feedback.
- **REST API**: Simple backend API for code review requests.

---

## Tech Stack

- **Frontend**: React, Vite, PrismJS, react-simple-code-editor, react-markdown, rehype-highlight, Axios
- **Backend**: Node.js, Express, @google/generative-ai, CORS, dotenv

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Google Gemini API key (for backend)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `BackEnd/` and add your Gemini API key:
   ```env
   GOOGLE_GEMINI_KEY=your_api_key_here
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Usage

1. Open the frontend in your browser.
2. Enter or paste your code in the editor.
3. Click the **Review** button.
4. The AI-generated review will appear on the right, with suggestions and improvements.

---

## API Reference

### POST `/ai/get-review`

- **Request Body:**
  ```json
  { "code": "<your_code_here>" }
  ```
- **Response:**
  - AI-generated review as markdown text.

---

## Project Structure

```
BackEnd/
  src/
    app.js           # Express app setup
    routes/
      ai.routes.js   # API route for code review
    controllers/
      ai.controller.js # Handles review requests
    services/
      ai.service.js  # Integrates with Google Gemini
  server.js          # Entry point
Frontend/
  src/
    App.jsx          # Main React component
    ...
```

---



## Acknowledgements

- [Google Generative AI](https://ai.google.dev/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [PrismJS](https://prismjs.com/)
