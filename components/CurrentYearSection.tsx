'use client';

import { motion } from 'framer-motion';
// Keeping Swiper usage minimal for SSR compatibility
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function CurrentYearSection() {
  return (
    <section className="w-full bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl text-center text-accent font-bold tracking-widest uppercase mb-16">
          The Current Year
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* CAROUSEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[400px] bg-[#072C21] rounded border border-accent/30 overflow-hidden shadow-2xl relative"
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full h-full"
            >
              {[1, 2, 3].map((num) => (
                <SwiperSlide key={num}>
                  <div className="w-full h-full flex flex-col items-center justify-center bg-primary-dark opacity-80 mix-blend-luminosity">
                    <div className="text-accent/30 text-2xl font-heading">Event Photo {num}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Overlay Gradient for deeper integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#072C21] via-transparent to-transparent z-10 pointer-events-none" />
          </motion.div>

          {/* EDITORIAL BOARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-tamil text-3xl font-extrabold text-white mb-8 border-l-4 border-accent pl-4">
              38 ஆவது ஆசிரியர் குழு
            </h3>

            <div className="flex flex-col space-y-8">
              {/* Coordinator */}
              <div className="flex items-center gap-6 group">
                <div className="w-24 h-24 rounded-full border-2 border-accent/50 bg-[#1A5C45] overflow-hidden flex-shrink-0 group-hover:border-accent transition-colors" />
                <div>
                  <h4 className="font-heading text-2xl text-accent font-bold">Mr. T. Sebasthi John Baskar</h4>
                  <p className="text-cream/70 font-body text-sm mt-1">Co-ordinator — Assistant Professor, Tamil Dept.</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-accent/50 to-transparent" />

              {/* Editor */}
              <div className="flex items-center gap-6 group">
                <div className="w-24 h-24 rounded-full border-2 border-accent/50 bg-[#1A5C45] overflow-hidden flex-shrink-0 group-hover:border-accent transition-colors" />
                <div>
                  <h4 className="font-heading text-2xl text-accent font-bold">M. Karthi</h4>
                  <p className="text-cream/70 font-body text-sm mt-1">Editor — Final Year BSc Chemistry</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
