'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Palmtree, ShoppingCart, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  services?: any[];
}

interface CartItem {
  id: number;
  name: string;
  basePrice: number;
  type: string;
  images?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to IslandLoaf! I'm your Sri Lanka travel assistant.\n\nTell me about your dream vacation - are you looking for beaches, mountains, wildlife, temples, or adventure? How many days are you planning, and who's traveling with you?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('islandloaf_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('islandloaf_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          cart
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        services: data.services
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (service: any) => {
    if (cart.find(item => item.id === service.id)) return;
    
    setCart(prev => [...prev, {
      id: service.id,
      name: service.name,
      basePrice: service.basePrice,
      type: service.type,
      images: service.images
    }]);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Added "${service.name}" to your trip! Would you like to add more experiences or are you ready to checkout?`
    }]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.basePrice || 0), 0);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-rose-50 to-orange-50">
      <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-lg shadow-rose-200">
            <Palmtree className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-gray-800">IslandLoaf</span>
            <p className="text-xs text-gray-500 hidden sm:block">AI Travel Assistant</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowCart(true)}
          className="relative flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl transition shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">My Trip</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 ${message.role === 'user' ? 'flex justify-end' : ''}`}
            >
              {message.role === 'user' ? (
                <div className="max-w-[85%] bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg shadow-rose-200">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <Palmtree className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 max-w-[calc(100%-44px)]">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
                    
                    {message.services && message.services.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.services.map((service: any) => (
                          <div 
                            key={service.id} 
                            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition shadow-sm"
                          >
                            <div className="flex gap-4">
                              {service.images?.[0] && (
                                <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={service.images[0]}
                                    alt={service.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{service.name}</h4>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                                <div className="flex items-center justify-between mt-2 gap-2">
                                  <span className="text-rose-500 font-semibold text-sm">
                                    ${service.basePrice} {service.type === 'stays' ? '/night' : ''}
                                  </span>
                                  <button
                                    onClick={() => addToCart(service)}
                                    disabled={cart.some(item => item.id === service.id)}
                                    className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white text-xs sm:text-sm rounded-lg transition whitespace-nowrap shadow-sm"
                                  >
                                    {cart.some(item => item.id === service.id) ? 'Added' : 'Add to Trip'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                <Palmtree className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-rose-300 focus-within:shadow-md transition">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me about your dream trip..."
              rows={1}
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 px-4 py-4 pr-14 resize-none focus:outline-none max-h-32"
              style={{ minHeight: '56px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Ask about stays, tours, vehicles, wellness & more across Sri Lanka
          </p>
          <p className="text-[11px] text-gray-400 text-center mt-2">
            By using IslandLoafStay, you agree to our{' '}
            <Link href="/terms-and-conditions" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">
              Terms
            </Link>
            ,{' '}
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">
              Privacy Policy
            </Link>
            , and{' '}
            <Link href="/return-policy" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">
              Return Policy
            </Link>
            .
          </p>
        </form>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-rose-500 to-orange-500">
              <h2 className="text-lg font-semibold text-white">Your Trip</h2>
              <button onClick={() => setShowCart(false)} className="p-2 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[50vh]">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No items in your trip yet</p>
                  <p className="text-sm mt-1">Chat with me to find experiences!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      {item.images?.[0] && (
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-800 font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-rose-500 text-sm font-semibold">${item.basePrice}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-gray-800">${cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    window.location.href = '/checkout';
                  }}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold rounded-xl transition shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
