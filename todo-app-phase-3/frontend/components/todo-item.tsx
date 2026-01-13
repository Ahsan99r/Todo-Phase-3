import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { updateTodo, deleteTodo } from '@/lib/api';
import { mutate } from 'swr';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export function TodoItem({ todo }: { todo: Todo }) {
  const toggleComplete = async () => {
    // Optimistic update could go here, but for now we rely on fast SWR revalidation
    await updateTodo(todo.id, { is_completed: !todo.is_completed });
    mutate('/api/todos/');
  };

  const remove = async () => {
    await deleteTodo(todo.id);
    mutate('/api/todos/');
  };

  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all shadow-sm"
    >
      <div className="flex items-center gap-4 flex-1">
        <button 
            onClick={toggleComplete} 
            className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none"
        >
          {todo.is_completed ? (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <CheckCircle className="w-6 h-6 text-green-400" />
            </motion.div>
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div className={clsx("flex flex-col transition-all duration-300", todo.is_completed && "opacity-40 line-through grayscale")}>
          <span className="font-medium text-gray-200">{todo.title}</span>
          {todo.description && <span className="text-xs text-gray-500">{todo.description}</span>}
        </div>
      </div>
      
      <button 
        onClick={remove} 
        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}