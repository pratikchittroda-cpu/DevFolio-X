import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm DevBot. Ask me about Alex's projects or skills.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if API Key exists in env
    if (process.env.API_KEY) {
        setHasKey(true);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (!hasKey) {
        // Mock response if no key
        setTimeout(() => {
             setMessages(prev => [...prev, { 
                role: 'model', 
                text: "I am currently in demo mode because no API_KEY was detected. Please add a valid Gemini API Key to unlock my full potential!", 
                timestamp: new Date() 
            }]);
            setIsLoading(false);
        }, 1000);
        return;
      }

      const responseText = await sendMessageToGemini(userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the neural network.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-700/50 flex items-center justify-between bg-zinc-800/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold text-sm tracking-wide">DevBot AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-purple-600'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-900/30 text-cyan-50 border border-cyan-700/30 rounded-tr-none' 
                      : 'bg-zinc-800 text-zinc-300 border border-zinc-700/30 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-lg rounded-tl-none border border-zinc-700/30">
                    <Loader className="animate-spin w-4 h-4 text-zinc-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-800/30 border-t border-zinc-700/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about skills..."
                  className="w-full bg-zinc-950/50 border border-zinc-700 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600 text-white"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1 top-1 p-1.5 bg-zinc-700 hover:bg-cyan-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <div className="mt-2 text-center">
                 <span className="text-[10px] text-zinc-600">Powered by Google Gemini 2.5</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] transition-shadow z-50"
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </motion.button>
    </div>
  );
};
