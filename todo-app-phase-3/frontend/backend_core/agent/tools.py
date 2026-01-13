from sqlmodel import Session, select
from models import Todo

def add_task(session: Session, title: str, description: str = None):
    """Add a new task to the todo list."""
    todo = Todo(title=title, description=description)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return f"Task added: {todo.title} (ID: {todo.id})"

def list_tasks(session: Session, status: str = "all"):
    """List tasks. Status can be 'all', 'completed', or 'pending'."""
    query = select(Todo)
    if status == "completed":
        query = query.where(Todo.is_completed == True)
    elif status == "pending":
        query = query.where(Todo.is_completed == False)
        
    todos = session.exec(query).all()
    if not todos:
        return "No tasks found."
    return "\n".join([f"{t.id}: {t.title} ([{'x' if t.is_completed else ' ' }])" for t in todos])

def complete_task(session: Session, task_id: int):
    """Mark a task as completed."""
    todo = session.get(Todo, task_id)
    if not todo:
        return f"Task with ID {task_id} not found."
    todo.is_completed = True
    session.add(todo)
    session.commit()
    return f"Task {task_id} marked as completed."

def delete_task(session: Session, task_id: int):
    """Delete a task."""
    todo = session.get(Todo, task_id)
    if not todo:
        return f"Task with ID {task_id} not found."
    session.delete(todo)
    session.commit()
    return f"Task {task_id} deleted."

tools_definition = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task to the todo list",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "The title of the task"},
                    "description": {"type": "string", "description": "Optional description"}
                },
                "required": ["title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List tasks with optional status filter",
            "parameters": {
                "type": "object",
                "properties": {
                    "status": {"type": "string", "enum": ["all", "completed", "pending"]}
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as completed using its ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer", "description": "The ID of the task to complete"}
                },
                "required": ["task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete a task using its ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "integer", "description": "The ID of the task to delete"}
                },
                "required": ["task_id"]
            }
        }
    }
]