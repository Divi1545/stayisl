'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Home, Mail, Loader2, FileText } from 'lucide-react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-400">Confirming your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Booking Confirmed!</h1>
            <p className="text-slate-400 text-lg">
              Your payment was successful and your booking has been confirmed.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 mb-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-6">
              <p className="text-sm text-slate-400 mb-1">Booking Reference</p>
              <p className="text-2xl font-mono font-bold text-emerald-400">
                {sessionId?.slice(-12).toUpperCase() || 'BOOKING-123'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Confirmation Email Sent</p>
                  <p className="text-sm text-slate-400">
                    We've sent a confirmation email with all your booking details.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white mb-4">What's Next?</h3>
                <ul className="space-y-3">
                  {[
                    'Check your email for the booking confirmation',
                    'The vendor will contact you with further details',
                    'Save your booking reference for future use'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-emerald-400">{idx + 1}</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/booking/lookup"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-xl transition"
            >
              <FileText className="w-5 h-5" />
              View My Bookings
            </Link>
          </div>
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

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
