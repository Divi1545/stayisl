'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, X, MessageCircle } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export function MobileChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hey! Ready to plan your Sri Lanka adventure?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedServices, setSuggestedServices] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSuggestedServices([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message || 'Sorry, try again.' }]);

      if (data.services?.length > 0) {
        setSuggestedServices(data.services);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm here to help! Ask about beaches, tours, or stays." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center z-50 lg:hidden"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col lg:hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Trip Planner</h3>
            <p className="text-xs text-slate-400">AI assistant</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-br-sm'
                : 'bg-white/10 text-slate-200 rounded-bl-sm'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        {suggestedServices.slice(0, 2).map((service) => (
          <Link key={service.id} href={`/services/${service.id}`} onClick={() => setIsOpen(false)}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image src={service.images?.[0] || '/placeholder-image.jpg'} alt={service.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-white line-clamp-1">{service.name}</h4>
                  <p className="text-sm font-bold text-emerald-400">{service.currency} {service.basePrice}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Plan your trip..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 disabled:opacity-50 rounded-xl"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
