'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GiDove } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'NOTICE', path: '/notice' },
  { name: 'BLACKBOARD', path: '/blackboard' },
  { name: 'HISTORY', path: '/history' },
  { name: 'LIBRARY', path: '/library' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'SPONSORS', path: '/sponsors' },
  { name: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary-dark/95 backdrop-blur-md border-b border-accent/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="Ilanthoodhu Logo" width={48} height={48} className="drop-shadow-[0_0_10px_rgba(201,168,76,0.6)] object-contain" />
            <div className="flex flex-col">
              <Link href="/" className="font-tamil text-3xl font-extrabold bg-gold-gradient text-transparent bg-clip-text drop-shadow-md tracking-wider">
                இளந்தாது
              </Link>
              <div className="bg-accent/10 text-accent-light text-[9px] font-bold px-2 py-0.5 rounded border border-accent/20 w-fit tracking-[0.2em] uppercase mt-0.5 shadow-inner">
                38th Year Since 1987
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-heading font-medium transition-colors hover:text-accent-light tracking-widest ${
                    isActive ? 'text-accent' : 'text-cream/70'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cream hover:text-accent transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-dark border-t border-accent/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-heading font-medium tracking-widest ${
                      isActive ? 'bg-accent/10 text-accent' : 'text-cream/80 hover:bg-white/5 hover:text-accent-light'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
