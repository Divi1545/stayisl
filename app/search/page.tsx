'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { VendorAPI } from '@/lib/api';
import { Service, SearchFilters } from '@/lib/types';
import { Filter, Loader2, MapPin, Star, Search, X, SlidersHorizontal } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: searchParams.get('type') as any || undefined,
    location: searchParams.get('location') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  });
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [services, filters, sortBy, searchQuery]);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await VendorAPI.getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...services];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.location.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    }

    if (filters.type) {
      filtered = filtered.filter(s => s.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter(s => 
        s.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(s => s.basePrice >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(s => s.basePrice <= filters.maxPrice!);
    }

    filtered = filtered.filter(s => s.available);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredServices(filtered);
  };

  const clearFilters = () => {
    setFilters({});
    setSortBy('featured');
    setSearchQuery('');
  };

  const serviceTypes = ['stays', 'tours', 'vehicles', 'wellness', 'tickets', 'products'];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {filters.type 
                ? `${filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}` 
                : 'Explore Experiences'}
            </h1>
            <p className="text-slate-400">
              {loading ? 'Loading...' : `${filteredServices.length} experiences found`}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, activities..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition ${
                  showFilters 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="featured" className="bg-slate-900">Featured</option>
                <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                <option value="rating" className="bg-slate-900">Highest Rated</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-emerald-400 hover:text-emerald-300">
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                  <select
                    value={filters.type || 'all'}
                    onChange={(e) => setFilters({...filters, type: e.target.value === 'all' ? undefined : e.target.value as any})}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="all">All Types</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Colombo, Galle"
                    value={filters.location || ''}
                    onChange={(e) => setFilters({...filters, location: e.target.value || undefined})}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Min Price (USD)</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value ? Number(e.target.value) : undefined})}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Max Price (USD)</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined})}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {serviceTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilters({...filters, type: filters.type === type ? undefined : type as any})}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filters.type === type
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-white/10" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <div className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.images?.[0] || 'https://images.unsplash.com/photo-1588598198321-9735fd46a2f4?w=800&q=80'}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                          {service.type}
                        </span>
                      </div>
                      {service.rating > 0 && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-white text-xs font-medium">{service.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition line-clamp-1">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-400 text-sm mt-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{service.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-slate-400 text-sm">From</span>
                          <p className="text-xl font-bold text-white">
                            {service.currency} {service.basePrice?.toLocaleString()}
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition">
                          View
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-xl text-white mb-2">No experiences found</p>
              <p className="text-slate-400 mb-6">Try adjusting your filters or search query</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchContent />
    </Suspense>
  );
}
