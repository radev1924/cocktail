'use client';

import Link from 'next/link';
import {  Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="bg-blue-500 dark:bg-blue-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-white text-2xl font-bold transform transition duration-200 hover:scale-105">
          <span>Daniel&apos;s Cocktail</span>
        </Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white transform transition duration-200 hover:scale-110"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;