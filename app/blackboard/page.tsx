'use client';

import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { useState, useEffect } from 'react';

const BLACKBOARD_QUERY = `*[_type == "blackboard"] | order(date desc) {
  _id, title, bulletPoints, date
}`;

export default function BlackboardPage() {
  const [boards, setBoards] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchBoards = async () => {
      try {
        const data = await client.fetch(BLACKBOARD_QUERY);
        if (data && data.length > 0) {
          setBoards(data);
        } else {
          setBoards([
            {
              _id: '1',
              title: 'இன்றைய கருத்துப் பலகை',
              date: '2025-03-20T00:00:00Z',
              bulletPoints: [
                '"யாதும் ஊரே யாவரும் கேளிர்" — புறநானூறு',
                '36ஆவது பதிப்பு கட்டுரை சமர்பிக்கும் கடைசி நாள்: மார்ச் 30, 2025',
                '2010 மார்ச் பதிப்பு டிஜிட்டல் நூலகத்தில் சேர்க்கப்பட்டுள்ளது.'
              ]
            }
          ]);
        }
      } catch (err) {
        console.error("Sanity blackboard fetch error:", err);
      }
    };
    fetchBoards();
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-cream/50">Loading Blackboard...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="font-tamil text-5xl text-accent font-bold mb-4 drop-shadow-md">கருத்துப் பலகை</h1>
          <p className="font-heading text-cream/70 text-xl tracking-widest uppercase">The Blackboard</p>
        </div>

        <div className="grid gap-12">
          {boards.map((board: any) => (
            <div 
              key={board._id}
              className="relative bg-[#1A2621] min-h-[400px] p-8 md:p-12 shadow-[inset_0_0_40px_rgba(0,0,0,0.8),5px_5px_15px_rgba(0,0,0,0.6)] border-[12px] border-[#3E2723] rounded-sm transform before:absolute before:inset-0 before:bg-[url('/textures/chalkboard.png')] before:opacity-20 before:pointer-events-none"
            >
              <h2 className="font-tamil text-4xl font-bold bg-gradient-to-r from-pink-300 via-yellow-200 to-green-300 text-transparent bg-clip-text mb-10 text-center tracking-wide" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.2)" }}>
                {board.title}
              </h2>
              
              <ul className="space-y-6 font-tamil text-2xl text-yellow-100/90 leading-relaxed list-none max-w-3xl mx-auto">
                {board.bulletPoints?.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-pink-300 font-bold mt-1 text-3xl">✦</span>
                    <p>{point}</p>
                  </li>
                ))}
              </ul>

              {/* Chalk pieces */}
              <div className="absolute bottom-4 right-6 w-8 h-2 bg-white/80 rounded-sm shadow-sm rotate-12" />
              <div className="absolute bottom-4 right-16 w-6 h-2 bg-pink-200/80 rounded-sm shadow-sm -rotate-12" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
