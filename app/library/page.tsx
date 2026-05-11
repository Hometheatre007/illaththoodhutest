'use client';

import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const LIBRARY_QUERY = `*[_type == "digitalLibrary"] | order(year desc, month desc) {
  _id, year, month, edition, pdfLink, coverImage
}`;

export default function LibraryPage() {
  const [archives, setArchives] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchArchives = async () => {
      try {
        const data = await client.fetch(LIBRARY_QUERY);
        if (data && data.length > 0) {
          setArchives(data);
        } else {
          setArchives([
            { _id: '1', year: '2024', month: 'September', edition: '36th', pdfLink: '#' },
            { _id: '2', year: '2023', month: 'September', edition: '35th', pdfLink: '#' },
            { _id: '3', year: '2023', month: 'March', edition: '34th', pdfLink: '#' },
            { _id: '4', year: '2018', month: 'September', edition: '29th', pdfLink: '#' },
            { _id: '5', year: '1999', month: 'Special', edition: '10th Anniv', pdfLink: '#' },
            { _id: '6', year: '1989', month: 'November', edition: '1st Monthly', pdfLink: '#' },
          ]);
        }
      } catch (err) {
        console.error("Sanity client fetch error:", err);
      }
    };
    fetchArchives();
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-cream/50">Loading Archive...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <div className="absolute inset-0 bg-[url('/textures/parchment.png')] opacity-5 mix-blend-overlay pointer-events-none" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Digital Library</h1>
          <p className="font-tamil text-cream/70 text-2xl">டிஜிட்டல் நூலகம்</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
           {['All', '2020s', '2010s', '2000s', '1990s', '1980s'].map((filter) => (
             <button key={filter} className="px-6 py-2 rounded-full border border-accent/40 text-cream/80 hover:bg-accent hover:text-primary-dark transition-colors font-heading text-sm uppercase tracking-widest font-bold bg-[#072C21]">
               {filter}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {archives.map((item: any) => (
            <Link key={item._id} href={item.pdfLink || '#'} target={item.pdfLink && item.pdfLink !== '#' ? '_blank' : '_self'} prefetch={false} className="group block perspective-1000">
              <div className="relative aspect-[3/4] bg-[#072C21] rounded border border-accent/20 shadow-xl overflow-hidden group-hover:border-accent/80 transition-colors transform group-hover:-translate-y-2 group-hover:rotate-y-[5deg] duration-300">
                {/* Decorative book spine */}
                <div className="absolute left-0 top-0 w-4 h-full bg-[#051F15] border-r border-accent/10 z-10" />
                
                <div className="ml-4 p-4 h-full flex flex-col items-center justify-center bg-primary text-center">
                  <span className="font-tamil text-2xl font-bold bg-gold-gradient text-transparent bg-clip-text mb-2 block">
                    இளந்தாது
                  </span>
                  <span className="bg-accent/10 text-accent border border-accent/20 px-2 py-1 text-xs font-bold rounded mb-4">
                    {item.edition}
                  </span>
                  
                  <div className="mt-auto">
                    <div className="text-cream/90 font-heading font-bold text-2xl">{item.year}</div>
                    <div className="text-cream/60 text-xs uppercase tracking-widest mt-1">{item.month}</div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-primary-dark/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaFilePdf className="text-5xl text-accent mb-4 drop-shadow-md" />
                  <span className="text-cream font-bold tracking-widest uppercase text-xs">Read PDF</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
