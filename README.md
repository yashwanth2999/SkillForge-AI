# SkillForge AI

A full-stack MERN application that uses Generative AI (Google Gemini) to generate personalized software project ideas, complete with architecture, APIs, roadmaps, and interview questions.

## Features
- AI-Powered project generation tailored to skill and experience level.
- Complete folder structure, database schema, and REST API definitions.
- 30-day development roadmap.
- Resume bullet points and Viva questions.
- Save projects to your dashboard.
- Export project architecture as PDF.
- Dark/Light mode toggle.
- Modern Glassmorphism UI with Framer Motion animations.

## Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB running locally or a MongoDB Atlas URI
- Google Gemini API Key

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder (or edit the existing one) with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/skillforgeai  # Change to your Atlas URI if not local
   JWT_SECRET=your_jwt_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:5173`.

## Deployment Guide

### Deploying Backend to Render
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository and select the `backend` folder as the Root Directory.
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add all the Environment Variables from your `.env` file (MONGO_URI, JWT_SECRET, GEMINI_API_KEY).
7. Deploy! Wait for the service to go live and copy the provided backend URL.

### Deploying Frontend to Vercel
1. Update the `baseURL` in `frontend/src/services/api.js` to point to your deployed Render backend URL.
2. Go to [Vercel](https://vercel.com/) and import your GitHub repository.
3. Edit the Root Directory to point to `frontend`.
4. Framework Preset will automatically be detected as Vite.
5. Deploy! Vercel will build and host your frontend application.

## Tech Stack
- MongoDB, Express.js, React (Vite), Node.js
- Tailwind CSS, Framer Motion, Lucide React
- @google/genai SDK
