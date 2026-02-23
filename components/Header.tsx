'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Palmtree, Search, Package } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/search?type=stays', label: 'Stays' },
    { href: '/search?type=tours', label: 'Tours' },
    { href: '/search?type=vehicles', label: 'Vehicles' },
    { href: '/packages/builder', label: 'Packages' },
    { href: '/booking/lookup', label: 'My Bookings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <Palmtree className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">IslandLoafStay</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </Link>
            <Link
              href="/packages/builder"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg transition"
            >
              <Package className="w-4 h-4" />
              <span>Build Trip</span>
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/search"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/10 text-white rounded-lg"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
              <Link
                href="/packages/builder"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-lg"
              >
                <Package className="w-4 h-4" />
                Build Your Trip
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
