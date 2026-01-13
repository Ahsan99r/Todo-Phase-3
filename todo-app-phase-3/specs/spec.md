# Project Specification: Todo AI Chatbot (Phase III)

## 1. Overview
A full-stack Todo application featuring a Next.js frontend and a FastAPI backend. The app integrates AI capabilities to manage tasks via natural language chat, alongside a traditional point-and-click UI.

## 2. Tech Stack
### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (matching Vercel-style aesthetics)
- **State Management:** React Hooks (SWR/TanStack Query recommended for sync)
- **AI Integration:** Vercel AI SDK (for chat UI)
- **Icons:** Lucide React

### Backend
- **Framework:** FastAPI (Python)
- **Database:** SQLModel (PostgreSQL/SQLite compatible)
- **AI Logic:** OpenAI API (Chat Completions with Function Calling/Tools)
- **Protocol:** Model Context Protocol (MCP) for tool definitions
- **Auth:** Better Auth (Conceptual integration/Bearer token)

## 3. Features
### Todo Management (CRUD)
- Create task (Title, optional description)
- List tasks (Filter by status)
- Update task (Title, description, status)
- Delete task
- Toggle completion

### AI Chat Assistant
- Natural language task management ("Add buy milk to my list")
- Context awareness (reads existing todos)
- Ambiguity resolution ("Which task did you mean?")
- Confirmation flows

## 4. Data Model (SQLModel)
### User
- id: int
- email: str
- created_at: datetime

### Todo
- id: int
- user_id: int (FK)
- title: str
- description: str (optional)
- is_completed: bool
- created_at: datetime

### Message (History)
- id: int
- user_id: int (FK)
- role: str (user/assistant)
- content: str
- created_at: datetime

## 5. API Endpoints
- `GET /api/todos`: List todos
- `POST /api/todos`: Create todo
- `PATCH /api/todos/{id}`: Update todo
- `DELETE /api/todos/{id}`: Delete todo
- `POST /api/chat`: Chat interaction (Streamed response)

## 6. MCP Tools
- `add_task`
- `list_tasks`
- `update_task`
- `delete_task`
- `complete_task`
