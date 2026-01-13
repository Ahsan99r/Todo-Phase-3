'use client';

import useSWR from 'swr';
import { fetcher, createTodo } from '@/lib/api';
import { TodoItem } from './todo-item';
import { useState } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TodoList() {
  const { data: todos, error } = useSWR('/api/todos/', fetcher, { refreshInterval: 1000 });
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await createTodo(newTodo);
    setNewTodo('');
  };

  if (error) return <div className="text-red-400 text-center">Failed to load tasks</div>;

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden border-t border-white/10">
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <ListTodo size={24} />
            </div>
            <h2 className="font-bold text-xl tracking-tight">Tasks</h2>
        </div>
        <div className="text-xs font-mono text-gray-500 bg-black/20 px-2 py-1 rounded">
            {todos ? todos.length : 0} ITEMS
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {!todos ? (
             <div className="space-y-3">
                 {[1,2,3].map(i => (
                     <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse"/>
                 ))}
             </div>
        ) : todos.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
               <ListTodo size={48} className="opacity-20" />
               <p>No tasks yet. Start by adding one!</p>
           </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
                {todos.map((todo: any) => <TodoItem key={todo.id} todo={todo} />)}
            </AnimatePresence>
          </div>
        )}
      </div>

      <form onSubmit={handleAdd} className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-sm">
        <div className="relative flex items-center">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="glass-input w-full pl-4 pr-12 py-3 rounded-xl focus:outline-none"
            />
            <button 
                type="submit"
                disabled={!newTodo.trim()} 
                className="absolute right-2 p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
            </button>
        </div>
      </form>
    </div>
  );
}