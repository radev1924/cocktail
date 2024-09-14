'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-white text-2xl font-bold">
          <span>Cocktail</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;