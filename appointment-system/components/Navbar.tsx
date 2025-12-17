"use client";

import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold text-[var(--foreground)] tracking-wide hover:opacity-80 transition-opacity">
            VELORA
          </Link>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Style Meets Elegance</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'Team', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
                className="text-(--text-muted) hover:text-(--primary) text-sm font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] transition-all"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>

          <Link href="#book-now" className="hidden md:flex bg-[var(--card-bg)] text-[var(--foreground)] px-5 py-2 rounded-lg border border-[var(--card-border)] hover:border-[var(--primary)] transition-all items-center gap-2 font-medium">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}