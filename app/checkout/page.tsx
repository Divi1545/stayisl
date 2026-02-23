'use client';

import { useState, useEffect } from 'react';
import { Palmtree, ArrowLeft, CreditCard, Calendar, Users, Mail, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  basePrice: number;
  type: string;
  images?: string[];
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    startDate: '',
    endDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('islandloaf_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + (item.basePrice || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.removeItem('islandloaf_cart');
      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-200">
            <Palmtree className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Request Sent!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your booking request. Our team will review your trip details and contact you within 24 hours to confirm availability and finalize your booking.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium rounded-xl transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Chat
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Chat with our AI assistant to find experiences for your trip!</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium rounded-xl transition shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Start Planning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50">
      <header className="flex items-center gap-4 px-4 md:px-6 py-4 bg-white/80 backdrop-blur-lg shadow-sm">
        <Link href="/" className="p-2 text-gray-500 hover:text-gray-800 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-md">
            <Palmtree className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-800">Checkout</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-500" />
                Booking Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Travelers
                    </label>
                    <select
                      value={formData.travelers}
                      onChange={e => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-rose-400 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">Special Requests</label>
                  <textarea
                    value={formData.notes}
                    onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-rose-400 focus:bg-white resize-none transition"
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold rounded-xl transition mt-4 shadow-lg"
                >
                  {isSubmitting ? 'Processing...' : `Request Booking - $${cartTotal.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Trip</h3>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    {item.images?.[0] && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-800 text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-rose-500 text-sm font-semibold">${item.basePrice}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-gray-800">${cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
