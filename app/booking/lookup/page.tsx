'use client';

import { useState } from 'react';
import { Search, Loader2, Calendar, MapPin, Users, FileText } from 'lucide-react';
import { VendorAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function BookingLookupPage() {
  const [email, setEmail] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !reference) {
      toast.error('Please enter both email and booking reference');
      return;
    }

    setLoading(true);
    try {
      const result = await VendorAPI.getBooking(email, reference);
      
      if (result) {
        setBooking(result);
      } else {
        toast.error('Booking not found. Please check your details.');
        setBooking(null);
      }
    } catch (error) {
      toast.error('Failed to lookup booking. Please try again.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
            <p className="text-slate-400">
              Enter your email and booking reference to view your booking details
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 mb-8">
            <h2 className="text-lg font-semibold text-white mb-1">Find Your Booking</h2>
            <p className="text-sm text-slate-400 mb-6">
              Your booking reference can be found in your confirmation email
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Booking Reference</label>
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g., BOOKING-123 or session ID"
                  required
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 text-white font-medium rounded-xl transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Find Booking
                  </>
                )}
              </button>
            </form>
          </div>

          {booking && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{booking.serviceName || 'Your Booking'}</h3>
                    <p className="text-sm text-slate-400 mt-1">Reference: {booking.id || reference}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Dates</p>
                      <p className="text-sm text-white font-medium">{booking.startDate} - {booking.endDate}</p>
                    </div>
                  </div>

                  {booking.location && (
                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Location</p>
                        <p className="text-sm text-white font-medium">{booking.location}</p>
                      </div>
                    </div>
                  )}

                  {booking.guestsCount && (
                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Guests</p>
                        <p className="text-sm text-white font-medium">{booking.guestsCount}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 rounded-xl p-5 space-y-3">
                  <h4 className="font-medium text-white">Guest Information</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name</span>
                      <span className="text-white">{booking.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email</span>
                      <span className="text-white">{booking.customerEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-sm">Total Amount</span>
                      <p className="text-2xl font-bold text-white">
                        {booking.currency || 'USD'} {booking.totalPrice?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      booking.paymentStatus === 'paid' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {booking.paymentStatus?.charAt(0).toUpperCase() + booking.paymentStatus?.slice(1) || 'Pending'}
                    </span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="bg-white/5 rounded-xl p-5">
                    <h4 className="font-medium text-white mb-2">Special Requests</h4>
                    <p className="text-sm text-slate-300">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Can't find your booking? <span className="text-emerald-400">Contact our support team</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
