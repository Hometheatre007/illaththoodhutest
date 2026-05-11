'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-primary flex items-center justify-center overflow-hidden">
      {/* Background Layer with opacity for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #0B3D2E 10px), repeating-linear-gradient(#C9A84C55, #C9A84C)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/80" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center w-full"
        >
          <span className="inline-block font-heading text-accent-light tracking-[0.3em] font-bold text-xs md:text-sm mb-6 uppercase border-y border-accent/30 py-2 px-8">
            38th Year Edition
          </span>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="/images/logo.png"
              alt="Ilanthoodhu Bird Logo"
              width={160}
              height={160}
              className="drop-shadow-[0_0_25px_rgba(201,168,76,0.5)] object-contain"
            />
          </motion.div>

          <h1 className="font-tamil text-5xl md:text-9xl font-extrabold bg-gold-gradient text-transparent bg-clip-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-6 py-2 leading-tight">
            இளந்தாது
          </h1>

          <p className="font-heading text-xl md:text-4xl text-cream/90 italic tracking-wider mb-14 drop-shadow-md">
            "The Voice of Student Expression"
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <Link
              href="/edition/38"
              className="group relative px-10 py-4 overflow-hidden rounded border border-accent bg-accent/5 text-accent font-bold tracking-widest hover:text-primary-dark transition-all duration-500 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-accent to-accent-light transition-all duration-[400ms] ease-out group-hover:w-full" />
              <span className="relative z-10 flex items-center gap-2">
                EXPLORE EDITION <span>→</span>
              </span>
            </Link>
            <Link
              href="/library"
              className="px-10 py-4 rounded border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/60 transition-all duration-300 tracking-widest font-bold bg-primary-dark/30 hover:bg-primary-dark/80"
            >
              VIEW LIBRARY
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute bottom-16 left-12 hidden lg:flex items-center justify-center w-36 h-36 rounded-full border border-accent/30 bg-primary-dark/80 backdrop-blur-lg shadow-2xl before:absolute before:inset-2 before:rounded-full before:border before:border-accent/10 before:border-dashed"
      >
        <div className="text-center rotate-[-12deg]">
          <span className="block text-accent font-heading text-3xl font-extrabold drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]">38th</span>
          <span className="block text-cream/70 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Edition</span>
        </div>
      </motion.div>
    </section>
  );
}
