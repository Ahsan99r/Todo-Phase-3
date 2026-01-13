# Implementation Tasks

## Phase 1: Backend Foundation
- [ ] Initialize Python environment (venv)
- [ ] Install dependencies (fastapi, uvicorn, sqlmodel, openai, python-dotenv)
- [ ] Setup `database.py` with SQLModel (SQLite for dev)
- [ ] Create `models.py` (User, Todo, Message)
- [ ] Create `main.py` with basic health check

## Phase 2: Core API & MCP
- [ ] Implement `routes/todos.py` (CRUD)
- [ ] Implement `agent/tools.py` (MCP functions: add, list, update, delete)
- [ ] Setup OpenAI client and Agent logic in `routes/chat.py`
- [ ] Test API with `curl` or Swagger UI

## Phase 3: Frontend Setup
- [ ] Initialize Next.js project
- [ ] Install Tailwind CSS, Lucide React, ai (Vercel AI SDK), clsx
- [ ] Configure global styles and layout
- [ ] Create `lib/types.ts` matching backend models

## Phase 4: Frontend Features
- [ ] Build `TodoList` and `TodoItem` components
- [ ] Integrate API for Todo CRUD
- [ ] Build `ChatInterface` using Vercel AI SDK (`useChat`)
- [ ] Implement split-screen layout (Responsive)

## Phase 5: Integration & Polish
- [ ] Connect Chat to Backend
- [ ] Ensure Todo List updates after Chat actions
- [ ] Polish UI (Transitions, Loading states)
- [ ] Write README.md
