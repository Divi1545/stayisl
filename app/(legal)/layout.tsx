import Link from "next/link";
import type { ReactNode } from "react";
import { Palmtree } from "lucide-react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-lg shadow-rose-200">
              <Palmtree className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg font-semibold text-gray-800">IslandLoafStay</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900 transition">
              Privacy
            </Link>
            <Link href="/return-policy" className="text-gray-600 hover:text-gray-900 transition">
              Return Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-gray-600 hover:text-gray-900 transition">
              Terms
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-white/70 backdrop-blur rounded-2xl border border-rose-100 shadow-sm p-6 md:p-10">
          {children}
        </div>
      </main>

      <footer className="px-4 md:px-6 pb-10">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3">
            <Link href="/privacy-policy" className="hover:text-gray-800 transition">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/return-policy" className="hover:text-gray-800 transition">
              Return Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms-and-conditions" className="hover:text-gray-800 transition">
              Terms &amp; Conditions
            </Link>
          </div>
          <p>© {year} AI CODE AGENCY PVT LTD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

