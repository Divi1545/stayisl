import { VendorAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Users, ArrowLeft, Check, Calendar, Shield } from 'lucide-react';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await VendorAPI.getService(Number(id));

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative">
        <div className="absolute inset-0 h-[50vh]">
          <Image
            src={service.images[0] || 'https://images.unsplash.com/photo-1588598198321-9735fd46a2f4?w=1200&q=80'}
            alt={service.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </div>

        <div className="relative">
          <div className="px-6 lg:px-12 py-6">
            <Link 
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </div>

          <div className="px-6 lg:px-12 pt-20 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full capitalize">
                  {service.type}
                </span>
                {service.available && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                    Available
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {service.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{service.location}</span>
                </div>
                {service.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-white">{service.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({service.reviewsCount} reviews)</span>
                  </div>
                )}
                {service.maxCapacity > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>Up to {service.maxCapacity} guests</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {service.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {service.images.slice(0, 4).map((image, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src={image}
                        alt={`${service.name} ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-white mb-4">About this experience</h2>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {service.amenities && service.amenities.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">What's included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-300">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
                <div className="bg-slate-800 rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <MapPin className="w-10 h-10 mx-auto mb-2" />
                    <p className="font-medium text-white">{service.location}</p>
                    <p className="text-sm">Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-white">
                      {service.currency} {service.basePrice.toLocaleString()}
                    </span>
                    <span className="text-slate-400">/ night</span>
                  </div>
                  
                  {service.available ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Available for booking
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      Currently unavailable
                    </div>
                  )}
                </div>

                <Link 
                  href={service.available ? `/book/${service.id}` : '#'}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold rounded-xl transition ${
                    service.available 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Book Now
                </Link>

                <p className="text-xs text-center text-slate-500 mt-3">
                  You won't be charged yet
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>Secure payment via Stripe</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>24/7 customer support</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-400 mb-3">
                    Provided by <span className="text-white font-medium">{service.businessName}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
