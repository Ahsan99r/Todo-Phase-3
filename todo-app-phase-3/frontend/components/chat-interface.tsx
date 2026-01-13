'use client';

import { useChat } from 'ai/react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat/',
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden border-t border-white/10">
      <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Sparkles size={24} />
            </div>
            <h2 className="font-bold text-xl tracking-tight">AI Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 font-mono">ONLINE</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4 p-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Bot size={32} className="text-purple-400/50" />
            </div>
            <p className="max-w-xs">
                I can help you manage your tasks. Try saying <span className="text-purple-400">"Add buy milk"</span> or <span className="text-purple-400">"What do I have to do today?"</span>.
            </p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
            {messages.map((m) => (
            <motion.div 
                key={m.id} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                {m.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={14} className="text-purple-400" />
                    </div>
                )}
                
                <div
                className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                    m.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-none'
                    : 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-none'
                }`}
                >
                {m.content}
                </div>

                {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <User size={14} className="text-blue-400" />
                    </div>
                )}
            </motion.div>
            ))}
        </AnimatePresence>
        
        {isLoading && (
           <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
            >
             <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-purple-400" />
             </div>
             <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none text-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
             </div>
           </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-sm">
        <div className="relative flex items-center">
            <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask AI to manage tasks..."
            className="glass-input w-full pl-4 pr-12 py-3 rounded-xl focus:outline-none"
            />
            <button 
                disabled={isLoading || !input.trim()}
                type="submit" 
                className="absolute right-2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
            >
            <Send className="w-4 h-4" />
            </button>
        </div>
      </form>
    </div>
  );
}