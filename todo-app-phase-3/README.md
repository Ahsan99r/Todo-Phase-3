# Todo AI Chatbot (Phase III)

A modern, Vercel-style Todo application with an integrated AI Chat Assistant. Built with Next.js, FastAPI, and OpenAI.

## Features
- **Modern UI:** Clean, minimal design inspired by Vercel.
- **Todo List:** Standard CRUD operations for tasks.
- **AI Chatbot:** Manage tasks using natural language via an OpenAI-powered agent.
- **MCP Tools:** Stateless tool execution for task management.

## Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Vercel AI SDK, Lucide React, SWR.
- **Backend:** FastAPI, SQLModel (SQLite), OpenAI GPT-4o.

## Prerequisites
- Python 3.9+
- Node.js 18+
- OpenAI API Key

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
Run the backend:
```bash
python main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Folder Structure
```
/frontend
  /app          # Next.js App Router pages
  /components   # React components (Todo, Chat)
  /lib          # API utilities
/backend
  /agent        # AI Agent and MCP tools logic
  /routes       # FastAPI endpoints
  main.py       # Entry point
/specs          # Project documentation
```
