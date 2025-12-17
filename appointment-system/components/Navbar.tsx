"use client";

import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold text-[var(--foreground)] tracking-wide">VELORA</Link>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Style Meets Elegance</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Team', 'Contact'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[var(--text-muted)] hover:text-[var(--primary)] text-sm font-medium transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-(--card-bg) border border-(--card-border) hover:border-(--primary) transition-all">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}