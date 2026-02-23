'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏝️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">IslandLoafStay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-gray-700 hover:text-pink-500 transition">
              Browse
            </Link>
            <Link href="/search?type=stays" className="text-gray-700 hover:text-pink-500 transition">
              Stays
            </Link>
            <Link href="/search?type=tours" className="text-gray-700 hover:text-pink-500 transition">
              Tours
            </Link>
            <Link href="/search?type=vehicles" className="text-gray-700 hover:text-pink-500 transition">
              Vehicles
            </Link>
            <Link href="/booking/lookup" className="text-gray-700 hover:text-pink-500 transition">
              My Bookings
            </Link>
            <Button asChild className="rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500">
              <Link href="/search">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/search"
              className="block py-2 text-gray-700 hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/search?type=stays"
              className="block py-2 text-gray-700 hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Stays
            </Link>
            <Link
              href="/search?type=tours"
              className="block py-2 text-gray-700 hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/search?type=vehicles"
              className="block py-2 text-gray-700 hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              Vehicles
            </Link>
            <Link
              href="/booking/lookup"
              className="block py-2 text-gray-700 hover:text-pink-500 transition"
              onClick={() => setIsOpen(false)}
            >
              My Bookings
            </Link>
            <Button className="w-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500" asChild>
              <Link href="/search" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}


