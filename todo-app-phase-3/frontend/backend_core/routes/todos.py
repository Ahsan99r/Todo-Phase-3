from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import List

from database import get_session
from models import Todo, TodoCreate, TodoUpdate

router = APIRouter()

@router.get("/", response_model=List[Todo])
def read_todos(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    todos = session.exec(select(Todo).offset(skip).limit(limit)).all()
    return todos

@router.post("/", response_model=Todo)
def create_todo(todo: TodoCreate, session: Session = Depends(get_session)):
    if hasattr(Todo, "model_validate"):
        db_todo = Todo.model_validate(todo)
    else:
        db_todo = Todo.from_orm(todo)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.patch("/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo_update: TodoUpdate, session: Session = Depends(get_session)):
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if hasattr(todo_update, "model_dump"):
        todo_data = todo_update.model_dump(exclude_unset=True)
    else:
        todo_data = todo_update.dict(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(db_todo, key, value)
        
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    session.delete(db_todo)
    session.commit()
    return {"ok": True}
