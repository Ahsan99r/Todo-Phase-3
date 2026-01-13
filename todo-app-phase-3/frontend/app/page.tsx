'use client';

import { TodoList } from '@/components/todo-list';
import { ChatInterface } from '@/components/chat-interface';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-7xl"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
            Todo AI Agent
          </h1>
          <p className="text-gray-400">Your intelligent task management assistant</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[75vh]">
          <motion.section 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <TodoList />
          </motion.section>
          
          <motion.section 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col h-full"
          >
            <ChatInterface />
          </motion.section>
        </div>
      </motion.div>
    </main>
  );
}