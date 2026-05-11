'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiImage, FiSettings, FiList } from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: FiHome },
  { name: 'Notices', path: '/admin/notices', icon: FiList },
  { name: 'Blog & Articles', path: '/admin/blog', icon: FiFileText },
  { name: 'Gallery', path: '/admin/gallery', icon: FiImage },
  { name: 'Settings', path: '/admin/settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-[#030305] flex flex-col h-screen sticky top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-bold font-display">
            I
          </div>
          <span className="font-display font-medium tracking-wide text-white">ILANTHOODHU</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4 px-2 font-display">
          Menu
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 text-sm ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#fff]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/50'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 border border-white/10"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/90">Admin User</span>
            <span className="text-xs text-white/40">admin@ilanthoodhu.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
