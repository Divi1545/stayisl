'use client';

import Link from 'next/link';
import { WifiOff, Home, RefreshCcw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-2xl mb-4">
            <WifiOff className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">You're Offline</h1>
          <p className="text-slate-400">
            It looks like you've lost your internet connection. Don't worry, you can still browse previously viewed pages.
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium rounded-xl transition"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <p>Once you're back online, everything will work normally.</p>
        </div>
      </div>
    </div>
  );
}
