'use client';

import { motion } from 'framer-motion';

const milestones = [
  { year: '1987', title: 'The Inception', description: 'Founded as "Amirtharajakam" under the guidance of Prof. K. Sengaiyan and Principal Dr. R. Balasubramanian.' },
  { year: '1989', title: 'Monthly Publication', description: 'Started formal monthly publications spanning 30-35 pages, entirely funded by students.' },
  { year: '1999', title: '10th Anniversary', description: 'Released the special 10th Year commemorative edition marking a decade of literary excellence.' },
  { year: '2024', title: '36th Edition', description: 'Thriving in the digital age under Co-ordinator Mr. T. Sebasthi John Baskar.' },
  { year: '2026', title: '38th Edition', description: 'Thriving in the digital age under Co-ordinator Mr. T. Sebasthi John Baskar.' },
];

export default function TimelineSection() {
  return (
    <section className="w-full bg-[#072C21] py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-accent font-bold tracking-widest uppercase">Our Journey</h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded" />
        </div>

        <div className="relative">
          {/* Vertical Line - centered on desktop, left on mobile */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-accent/30" />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center justify-between w-full mb-16 flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node - centered on desktop, left on mobile */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-[#072C21] shadow-[0_0_10px_rgba(201,168,76,0.8)] z-10" />

                {/* Content */}
                <div className="hidden md:block md:w-5/12" />
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-[#0B3D2E] p-6 rounded border border-accent/20 shadow-xl hover:border-accent/60 transition-colors">
                    <span className="font-tamil text-3xl font-extrabold text-accent drop-shadow-sm mb-2 block">{milestone.year}</span>
                    <h4 className="font-heading text-xl text-white font-bold mb-3">{milestone.title}</h4>
                    <p className="font-body text-cream/80 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
