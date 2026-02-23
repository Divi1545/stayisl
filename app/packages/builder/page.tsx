'use client';

import { useState, useEffect } from 'react';
import { VendorAPI } from '@/lib/api';
import { Service } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { Package, Calendar as CalendarIcon, Minus, Check, Loader2, Sparkles } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PackageBuilderPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filterType, setFilterType] = useState<Service['type'] | 'all'>('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await VendorAPI.getServices();
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getSelectedServicesData = () => {
    return services.filter((s) => selectedServices.includes(s.id));
  };

  const calculateTotal = () => {
    const selected = getSelectedServicesData();
    const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 1;
    
    return selected.reduce((total, service) => {
      if (service.type === 'stays') {
        return total + service.basePrice * nights;
      }
      return total + service.basePrice;
    }, 0);
  };

  const calculateDiscount = () => {
    const total = calculateTotal();
    const itemCount = selectedServices.length;
    
    if (itemCount >= 4) return total * 0.15;
    if (itemCount >= 3) return total * 0.10;
    return 0;
  };

  const filteredServices = filterType === 'all' 
    ? services 
    : services.filter(s => s.type === filterType);

  const total = calculateTotal();
  const discount = calculateDiscount();
  const finalTotal = total - discount;

  const serviceTypes = ['all', 'stays', 'tours', 'vehicles', 'wellness'] as const;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Build Your Package</h1>
            </div>
            <p className="text-slate-400">
              Select multiple services to create your perfect Sri Lankan adventure. Save up to 15% when you bundle!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">Select Travel Dates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Start Date</p>
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
                    <p className="text-sm text-slate-400 mb-2">End Date</p>
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
                    {differenceInDays(endDate, startDate)} nights selected
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {serviceTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      filterType === type
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {type === 'all' ? 'All Services' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Available Services</h2>
                
                {filteredServices.map((service) => (
                  <div 
                    key={service.id} 
                    onClick={() => toggleService(service.id)}
                    className={`bg-white/5 border rounded-2xl p-4 cursor-pointer transition ${
                      selectedServices.includes(service.id)
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                        selectedServices.includes(service.id)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}>
                        {selectedServices.includes(service.id) && <Check className="w-4 h-4" />}
                      </div>
                      
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={service.images[0] || 'https://images.unsplash.com/photo-1588598198321-9735fd46a2f4?w=400&q=80'}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-white mb-1">{service.name}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2">{service.description}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-0.5 bg-white/10 text-slate-300 text-xs rounded-full capitalize">{service.type}</span>
                              <span className="px-2 py-0.5 bg-white/10 text-slate-300 text-xs rounded-full">{service.location}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-bold text-white">
                              {service.currency} {service.basePrice}
                            </p>
                            <p className="text-xs text-slate-500">
                              {service.type === 'stays' ? 'per night' : 'per person'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Package Summary</h2>

                <div className={`rounded-xl p-4 mb-4 ${
                  selectedServices.length >= 3 
                    ? 'bg-emerald-500/20 border border-emerald-500/30' 
                    : 'bg-white/5'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">Services Selected</span>
                    <span className="text-2xl font-bold text-white">{selectedServices.length}</span>
                  </div>
                  {selectedServices.length >= 3 && (
                    <div className="flex items-center gap-1 text-emerald-400 text-sm">
                      <Sparkles className="w-4 h-4" />
                      {selectedServices.length >= 4 ? '15%' : '10%'} discount applied!
                    </div>
                  )}
                </div>

                {selectedServices.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    <h3 className="text-sm font-medium text-slate-400">Your Services:</h3>
                    {getSelectedServicesData().map((service) => (
                      <div key={service.id} className="flex items-center gap-2 text-sm bg-white/5 rounded-lg p-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleService(service.id); }}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{service.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{service.type}</p>
                        </div>
                        <p className="text-white font-medium">${service.basePrice}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No services selected yet</p>
                  </div>
                )}

                {selectedServices.length > 0 && (
                  <div className="border-t border-white/10 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">USD {total.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-400">
                        <span>Discount ({selectedServices.length >= 4 ? '15%' : '10%'})</span>
                        <span>-USD {discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>USD {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    disabled={selectedServices.length === 0 || !startDate || !endDate}
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
                  >
                    Book Package
                  </button>
                  
                  {selectedServices.length === 0 && (
                    <p className="text-xs text-center text-slate-500">Select services to continue</p>
                  )}
                  
                  {selectedServices.length > 0 && (!startDate || !endDate) && (
                    <p className="text-xs text-center text-slate-500">Select dates to continue</p>
                  )}

                  <Link 
                    href="/search"
                    className="block w-full text-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition"
                  >
                    Browse More Services
                  </Link>
                </div>

                <div className="mt-4 bg-white/5 rounded-xl p-4 text-xs text-slate-400">
                  <p className="font-medium text-white mb-2">Package Discounts:</p>
                  <ul className="space-y-1">
                    <li>3+ services: 10% off</li>
                    <li>4+ services: 15% off</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
