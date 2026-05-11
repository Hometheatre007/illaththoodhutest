'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { FiLogOut, FiBell } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const { signOut } = useAuth();
  const pathname = usePathname();
  
  // Format pathname to display title (e.g., /admin/blog -> Blog)
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview';
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="h-16 border-b border-white/5 bg-[#030305]/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg font-display font-medium text-white tracking-wide">
          {getPageTitle()}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors relative">
          <FiBell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"></span>
        </button>
        
        <div className="w-px h-4 bg-white/10"></div>
        
        <button 
          onClick={signOut}
          className="text-sm text-white/60 hover:text-white flex items-center gap-2 transition-colors"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
