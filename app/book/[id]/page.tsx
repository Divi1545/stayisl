'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { VendorAPI } from '@/lib/api';
import { Service } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, ArrowRight, Loader2, Check, Calendar as CalendarIcon, Users, CreditCard } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = Number(params.id);

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guestsCount, setGuestsCount] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    loadService();
  }, [serviceId]);

  const loadService = async () => {
    try {
      const data = await VendorAPI.getService(serviceId);
      if (data) {
        setService(data);
      } else {
        toast.error('Service not found');
        router.push('/search');
      }
    } catch (error) {
      toast.error('Failed to load service');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!service || !startDate || !endDate) return 0;
    const nights = differenceInDays(endDate, startDate);
    return nights * service.basePrice;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!startDate || !endDate) {
        toast.error('Please select check-in and check-out dates');
        return;
      }
      if (guestsCount < 1) {
        toast.error('Please select number of guests');
        return;
      }
      if (service?.maxCapacity && guestsCount > service.maxCapacity) {
        toast.error(`Maximum ${service.maxCapacity} guests allowed`);
        return;
      }
    } else if (step === 2) {
      if (!customerName || !customerEmail) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(customerEmail)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBooking = async () => {
    if (!service || !startDate || !endDate) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          amount: calculateTotal(),
          currency: service.currency,
          customerEmail,
          customerName,
          bookingDetails: {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            guests: guestsCount,
            specialRequests,
            image: service.images[0],
          },
          successUrl: `${window.location.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/book/${service.id}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        toast.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to process booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Service not found</p>
      </div>
    );
  }

  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const total = calculateTotal();

  const steps = [
    { num: 1, label: 'Dates', icon: CalendarIcon },
    { num: 2, label: 'Details', icon: Users },
    { num: 3, label: 'Review', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Link 
            href={`/services/${service.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Service
          </Link>

          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    step >= s.num 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white/5 text-slate-400'
                  }`}>
                    <s.icon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 lg:w-12 h-0.5 mx-2 ${
                      step > s.num ? 'bg-emerald-500' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {step === 1 && 'Select Dates & Guests'}
                  {step === 2 && 'Your Information'}
                  {step === 3 && 'Review Your Booking'}
                </h2>

                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-4">Select Dates</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-slate-400 mb-2">Check-in</p>
                          <div className="bg-slate-800 rounded-xl p-4 border border-white/10">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              disabled={(date) => date < new Date()}
                              className="!bg-transparent [&_button]:text-white [&_button:hover]:bg-white/10 [&_button[aria-selected]]:bg-emerald-500 [&_button[aria-selected]]:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-2">Check-out</p>
                          <div className="bg-slate-800 rounded-xl p-4 border border-white/10">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              disabled={(date) => !startDate || date <= startDate}
                              className="!bg-transparent [&_button]:text-white [&_button:hover]:bg-white/10 [&_button[aria-selected]]:bg-emerald-500 [&_button[aria-selected]]:text-white"
                            />
                          </div>
                        </div>
                      </div>
                      {startDate && endDate && (
                        <p className="mt-4 text-sm text-emerald-400">
                          {nights} night{nights !== 1 ? 's' : ''} selected
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Number of Guests</label>
                      <input
                        type="number"
                        min={1}
                        max={service.maxCapacity || 100}
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full max-w-xs bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                      {service.maxCapacity && (
                        <p className="mt-2 text-sm text-slate-500">Maximum {service.maxCapacity} guests</p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                      <p className="mt-1 text-xs text-slate-500">Confirmation will be sent here</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+94 123 456 789"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Special Requests (Optional)</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requirements..."
                        rows={3}
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-slate-800/50 rounded-xl p-5 space-y-3">
                      <h3 className="font-medium text-white">Booking Details</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-400">Check-in</span>
                          <p className="text-white font-medium">{startDate && format(startDate, 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Check-out</span>
                          <p className="text-white font-medium">{endDate && format(endDate, 'MMM dd, yyyy')}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Guests</span>
                          <p className="text-white font-medium">{guestsCount}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Nights</span>
                          <p className="text-white font-medium">{nights}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-5 space-y-3">
                      <h3 className="font-medium text-white">Your Information</h3>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Name</span>
                          <span className="text-white">{customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Email</span>
                          <span className="text-white">{customerEmail}</span>
                        </div>
                        {customerPhone && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Phone</span>
                            <span className="text-white">{customerPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-slate-400 text-sm">{service.currency} {service.basePrice} x {nights} nights</span>
                          <p className="text-2xl font-bold text-white">{service.currency} {total.toLocaleString()}</p>
                        </div>
                        <Check className="w-8 h-8 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-3 text-slate-300 hover:text-white transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                  ) : <div />}
                  
                  {step < 3 ? (
                    <button 
                      onClick={handleNextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-xl transition"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleBooking}
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 text-white font-medium rounded-xl transition"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.images[0] || 'https://images.unsplash.com/photo-1588598198321-9735fd46a2f4?w=800&q=80'}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-white mb-1">{service.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{service.location}</p>

                  {startDate && endDate && (
                    <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                      <div className="flex justify-between text-slate-400">
                        <span>Check-in</span>
                        <span className="text-white">{format(startDate, 'MMM dd')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Check-out</span>
                        <span className="text-white">{format(endDate, 'MMM dd')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Guests</span>
                        <span className="text-white">{guestsCount}</span>
                      </div>
                      
                      <div className="border-t border-white/10 pt-3 mt-3">
                        <div className="flex justify-between text-slate-400 mb-2">
                          <span>{service.currency} {service.basePrice} x {nights} nights</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-white">
                          <span>Total</span>
                          <span>{service.currency} {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
