'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FounderYearbookSection() {
  return (
    <section className="w-full bg-primary py-24 relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#072C21] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* FOUNDER */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="relative mb-8 group">
              {/* Ornate Frame */}
              <div className="absolute -inset-2 bg-gold-gradient rounded-xl blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-0 border-[6px] border-[#8B6914] border-double rounded-xl z-20 pointer-events-none" />
              <div className="relative w-64 h-80 bg-[#1A5C45] rounded-xl overflow-hidden shadow-2xl z-10 flex items-center justify-center">
                {/* Founder Photo */}
                <img src="/images/main/founder-of-it.jpg" alt="A.Z. Radha Krishnan" className="object-cover w-full h-full" />
              </div>
            </div>
            
            <h3 className="font-heading text-3xl text-accent font-bold mb-3 tracking-wide">
              Mr. A.Z. Radha Krishnan
            </h3>
            <p className="font-heading text-cream/60 italic text-xl mb-6">Founder & First Editor</p>
            
            <p className="font-body text-cream/90 leading-relaxed text-lg max-w-md">
              Established in 1987 at Sacred Heart College, Ilanthoodhu began as a vision to foster Tamil literary expression among youths, originally titled "Amirtharajakam". With immense dedication, it stands strong today after 37 years.
            </p>
          </motion.div>

          {/* 38th YEAR BOOK */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end text-center lg:text-right"
          >
            <h2 className="font-tamil text-5xl font-extrabold text-white mb-2">38ஆவது ஆண்டு புத்தகம்</h2>
            <h3 className="font-heading text-2xl text-accent mb-10 tracking-widest uppercase">The 38th Publication</h3>
            
            <div className="relative w-64 h-96 group perspective-1000">
              <div className="absolute inset-0 bg-accent/20 blur-xl transform group-hover:scale-110 transition-transform duration-500" />
              <div className="relative w-full h-full bg-[#0D4A35] rounded-r-2xl rounded-l-sm border-l-8 border-[#072C21] shadow-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-y-[-10deg]">
                {/* Book Cover Placeholder */}
                <div className="font-tamil text-3xl font-bold bg-gold-gradient text-transparent bg-clip-text text-center px-4">
                  இளந்தாது<br/><span className="text-lg opacity-70">2024-2025</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link 
                href="mailto:illanthoodhu32@gmail.com?subject=Book Order Inquiry"
                className="px-8 py-4 bg-accent/10 border-2 border-accent text-accent font-bold tracking-widest rounded uppercase hover:bg-accent hover:text-primary-dark transition-colors duration-300"
              >
                ORDER THIS EDITION
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
