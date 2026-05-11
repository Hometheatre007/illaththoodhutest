'use client';

import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { useState, useEffect } from 'react';

const JOURNEY_QUERY = `*[_type == "journey"] | order(year asc) {
  _id, year, title, description
}`;

export default function HistoryPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchMilestones = async () => {
      try {
        const data = await client.fetch(JOURNEY_QUERY);
        if (data && data.length > 0) {
          setMilestones(data);
        } else {
          setMilestones([
            { _id: '1', year: '1987', title: 'The Inception', description: 'Founded as "Amirtharajakam" under the guidance of Prof. K. Sengaiyan and Principal Dr. R. Balasubramanian. Initiated at the first college festival with a classic yellow design.' },
            { _id: '2', year: '1989', title: 'Monthly Publication Era', description: 'Starting November 1989, it became a regular monthly publication spanning 30-35 pages, entirely funded by students. Second editor Aruna Ramesh led this transformation.' },
            { _id: '3', year: '1999', title: '10th Anniversary', description: "The 10th Year Special Edition was released, cementing the journal's legacy in the literary landscape of student expression." },
            { _id: '4', year: '2024', title: '36th Edition & Digital Forward', description: 'Currently running its 36th edition under Co-ordinator Mr. T. Sebasthi John Baskar and Editor M. Karthi. Introduced global digital archives and UI redesign.' },
          ]);
        }
      } catch (err) {
        console.error("Sanity client fetch error:", err);
      }
    };
    fetchMilestones();
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-cream/50">Loading History...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-24">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Our History</h1>
          <p className="font-tamil text-cream/70 text-2xl">இளந்தூதின் பயணம்</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          {milestones.map((milestone: any, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={milestone._id}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-[7px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-accent border-[3px] border-primary shadow-[0_0_15px_rgba(201,168,76,0.6)] z-10 mt-6 md:mt-0" />

                {/* Desktop Spacing */}
                <div className="hidden md:block w-5/12" />
                
                {/* Content Box */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div className={`bg-[#0B3D2E] p-8 rounded-lg border border-accent/20 shadow-xl relative group hover:border-accent/50 transition-all duration-300 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    
                    {/* Decorative Year Watermark */}
                    <div className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} text-6xl font-bold font-tamil text-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                      {milestone.year}
                    </div>

                    <span className="font-tamil text-4xl font-extrabold bg-gold-gradient text-transparent bg-clip-text drop-shadow-sm mb-4 block">
                      {milestone.year}
                    </span>
                    <h4 className="font-heading text-2xl text-white font-bold mb-4">{milestone.title}</h4>
                    <p className="font-body text-cream/80 text-lg leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
