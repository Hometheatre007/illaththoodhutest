'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiDove } from 'react-icons/gi';
import { IoClose, IoSend } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_ACTIONS = [
  "Submit Article",
  "History",
  "Order Book",
  "Current Editor"
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'வணக்கம்! நான் இளந்தூது AI உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்? (Hello, can I help you?)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Automatically pop open the chatbot 3 seconds after the site loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        // Show the server's bilingual error message directly (already user-friendly)
        const errorText = data.error || 'மன்னிக்கவும், பிழை ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்.';
        setMessages(prev => [...prev, { role: 'assistant', content: errorText }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'நெட்வொர்க் பிழை. இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும். (Network error. Check your connection and try again.)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything on the server
  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-[#0B3D2E] rounded-full flex items-center justify-center border-2 border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.4)] z-50 transition-transform duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <GiDove className="text-[#C9A84C] text-3xl drop-shadow-md" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[360px] max-w-[calc(100vw-32px)] h-[550px] max-h-[85vh] bg-primary rounded-xl border-2 border-accent shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-dark/80 backdrop-blur-md border-b border-accent/40 p-4 flex justify-between items-center shadow-md pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border border-accent/40">
                  <GiDove className="text-accent text-xl" />
                </div>
                <div>
                  <h3 className="font-tamil font-bold text-accent tracking-wider text-lg">இளந்தாது AI உதவியாளர்</h3>
                  <span className="text-[10px] text-cream/70 uppercase tracking-widest block -mt-1">Active</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-accent transition-colors">
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#072C21] scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-accent text-primary-dark rounded-tr-sm font-body font-medium shadow-md' 
                      : 'bg-[#1A5C45] text-cream border border-accent/20 rounded-tl-sm shadow-md'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      <ReactMarkdown
                        components={{
                          strong: ({node, ...props}) => <strong className="font-bold text-[#E5D38A]" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1A5C45] border border-accent/20 rounded-2xl rounded-tl-sm p-4 w-20 flex gap-1 items-center justify-center">
                    <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-accent rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="bg-primary-dark px-4 py-3 border-t border-accent/20 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map(action => (
                <button 
                  key={action}
                  onClick={() => handleSend(action)}
                  className="bg-accent/10 border border-accent/30 text-accent text-xs px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors whitespace-nowrap"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-primary-dark">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask a question in Tamil or English..."
                  className="w-full bg-[#1A5C45] border border-accent/30 text-white placeholder-white/40 text-sm rounded-lg p-3 resize-none focus:outline-none focus:border-accent min-h-[44px] max-h-32"
                  rows={1}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-accent text-primary-dark p-3 rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <IoSend className="text-lg" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
