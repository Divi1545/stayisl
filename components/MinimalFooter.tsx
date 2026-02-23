import Link from 'next/link';
import { Palmtree } from 'lucide-react';

export function MinimalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <Palmtree className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">IslandLoafStay</h3>
              <p className="text-sm text-slate-400">Sri Lanka Travel Experiences</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/search?type=stays" className="text-slate-400 hover:text-white transition">Stays</Link>
            <Link href="/search?type=tours" className="text-slate-400 hover:text-white transition">Tours</Link>
            <Link href="/search?type=vehicles" className="text-slate-400 hover:text-white transition">Vehicles</Link>
            <Link href="/packages/builder" className="text-slate-400 hover:text-white transition">Packages</Link>
            <Link href="/booking/lookup" className="text-slate-400 hover:text-white transition">My Bookings</Link>
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-slate-400 hover:text-white transition">Terms</Link>
            <Link href="/return-policy" className="text-slate-400 hover:text-white transition">Return Policy</Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
          <p>&copy; {year} IslandLoafStay. All rights reserved.</p>
          <p className="mt-1">Operated by AI CODE AGENCY PVT LTD.</p>
        </div>
      </div>
    </footer>
  );
}
