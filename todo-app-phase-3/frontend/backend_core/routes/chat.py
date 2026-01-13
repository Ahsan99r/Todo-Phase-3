import os
import json
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from sqlmodel import Session
from openai import OpenAI

from database import get_session
from agent.tools import tools_definition, add_task, list_tasks, complete_task, delete_task

from pathlib import Path

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

router = APIRouter()

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    # This prevents the crash if key is missing during initialization
    client = None
else:
    client = OpenAI(api_key=api_key)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

def execute_tool(name, args, session):
    if name == "add_task":
        return add_task(session, args.get("title"), args.get("description"))
    elif name == "list_tasks":
        return list_tasks(session, args.get("status", "all"))
    elif name == "complete_task":
        return complete_task(session, args.get("task_id"))
    elif name == "delete_task":
        return delete_task(session, args.get("task_id"))
    return "Error: Unknown tool"

@router.post("/")
async def chat_endpoint(request: ChatRequest, session: Session = Depends(get_session)):
    if not client:
        raise HTTPException(status_code=500, detail="OpenAI API Key not configured. Please check your .env file.")
    
    # Simple agent loop for demonstration
    # In a real app, you might use the Assistants API or a more complex loop
    
    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    
    # 1. Call model with tools
    response = client.chat.completions.create(
        model="gpt-4o", # Or gpt-3.5-turbo
        messages=messages,
        tools=tools_definition,
        tool_choice="auto",
        stream=False # Simplify logic for this phase: blocking call for tool execution
    )
    
    message = response.choices[0].message
    
    if message.tool_calls:
        # 2. Execute tools
        messages.append(message)
        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            
            tool_result = execute_tool(function_name, arguments, session)
            
            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": function_name,
                "content": str(tool_result)
            })
            
        # 3. Get final response
        stream = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            stream=True
        )
        
        def iter_content():
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        return StreamingResponse(iter_content(), media_type="text/plain")
        
    else:
        # Just a normal response
        return StreamingResponse(iter(message.content or ""), media_type="text/plain")

