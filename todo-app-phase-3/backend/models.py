from typing import Optional, List
from sqlmodel import Field, SQLModel
from datetime import datetime

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(default=1, index=True)
    title: str
    description: Optional[str] = None
    is_completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ChatMessage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(default=1, index=True)
    role: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TodoCreate(SQLModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None
