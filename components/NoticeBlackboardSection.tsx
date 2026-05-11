'use client';

import { motion } from 'framer-motion';

export default function NoticeBlackboardSection() {
  return (
    <section className="w-full bg-primary-dark/50 py-24 border-y border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* NOTICE BOARD */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/5 blur-2xl rounded-full pointer-events-none" />
            <div className="relative bg-[#E8DECE] min-h-[500px] p-8 md:p-12 shadow-[5px_5px_15px_rgba(0,0,0,0.6)] border-4 border-[#8B6914]/80 transform rotate-[-1deg] before:absolute before:inset-0 before:bg-[url('/textures/parchment.png')] before:opacity-30 before:mix-blend-multiply before:pointer-events-none">
              <h2 className="font-tamil text-4xl font-bold text-[#3B2F1F] mb-8 text-center border-b-2 border-[#8B6914]/30 pb-4 drop-shadow-sm">
                இன்றைய அறிவிப்பு
              </h2>
              
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="relative bg-white/60 p-6 shadow-md border border-[#8B6914]/20 hover:-translate-y-1 transition-transform">
                    {/* Pin Graphic */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-700 shadow-[2px_2px_4px_rgba(0,0,0,0.5)] border border-red-900 border-t-red-500" />
                    <h3 className="font-tamil font-bold text-xl text-[#4A3B28] mb-2 leading-tight">ஆசிரியர் குழு மாதாந்திர கூட்டம்</h3>
                    <p className="font-body text-[#5C4A38] text-sm">மார்ச் 28, மாலை 3:00 மணி, தமிழ் துறை. அனைவரும் தவறாமல் கலந்து கொள்ளவும்.</p>
                    <div className="mt-4 text-xs font-bold text-[#8B6914] tracking-wider uppercase">Feb 15, 2024</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* BLACKBOARD */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-[#1A2621] min-h-[500px] p-8 md:p-12 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),5px_5px_15px_rgba(0,0,0,0.6)] border-[12px] border-[#3E2723] rounded-sm transform rotate-[1deg] before:absolute before:inset-0 before:bg-[url('/textures/chalkboard.png')] before:opacity-20 before:pointer-events-none">
              
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/10 text-6xl">
                {/* Chalk smudge effect */}
                <div className="w-64 h-12 bg-white/5 blur-xl rounded-full" />
              </div>

              <h2 className="font-tamil text-4xl font-bold bg-gradient-to-r from-pink-300 via-yellow-200 to-green-300 text-transparent bg-clip-text mb-10 text-center tracking-wide" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.2)" }}>
                இன்றைய கருத்துப் பலகை
              </h2>
              
              <ul className="space-y-6 font-tamil text-xl text-yellow-100/90 leading-relaxed list-none">
                <li className="flex items-start gap-4">
                  <span className="text-pink-300 font-bold mt-1">✦</span>
                  <p>"யாதும் ஊரே யாவரும் கேளிர்" — புறநானூறு</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-green-300 font-bold mt-1">✦</span>
                  <p>36ஆவது பதிப்பு கட்டுரை சமர்பிக்கும் கடைசி நாள்: மார்ச் 30, 2025</p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-300 font-bold mt-1">✦</span>
                  <p>2010 மார்ச் பதிப்பு டிஜிட்டல் நூலகத்தில் சேர்க்கப்பட்டுள்ளது.</p>
                </li>
              </ul>

              {/* Chalk piece graphic */}
              <div className="absolute bottom-4 right-6 w-8 h-2 bg-white/80 rounded-sm shadow-sm rotate-12" />
              <div className="absolute bottom-4 right-16 w-6 h-2 bg-pink-200/80 rounded-sm shadow-sm -rotate-12" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
