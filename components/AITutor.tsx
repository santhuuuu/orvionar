
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAITutorResponse } from '../services/geminiService';

interface AITutorProps {
  lessonTitle: string;
}

const AITutor: React.FC<AITutorProps> = ({ lessonTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAITutorResponse(lessonTitle, input, messages);
      const aiMsg: ChatMessage = { role: 'model', text: response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Systems are currently under maintenance. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <i className="fas fa-sparkles text-sm"></i>
          </div>
          <div>
            <h2 className="font-black text-slate-900 tracking-tight">AI Assistant</h2>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm px-6">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
               <i className="fas fa-comment-dots text-2xl"></i>
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">Your Personal Mentor</h3>
            <p className="text-slate-400 text-sm font-medium">Ask me anything about <strong>{lessonTitle}</strong> or request real-world examples.</p>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-[1.5rem] p-4 text-sm font-medium shadow-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-[1.5rem] rounded-tl-none p-5 border border-slate-100 shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:border-indigo-100 transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
