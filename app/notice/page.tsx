'use client';

import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { BsPinAngleFill } from 'react-icons/bs';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const NOTICES_QUERY = `*[_type == "notice"] | order(isPinned desc, date desc) {
  _id, title, content, date, isPinned
}`;

export default function NoticePage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchNotices = async () => {
      try {
        const data = await client.fetch(NOTICES_QUERY);
        if (data && data.length > 0) {
          setNotices(data);
        } else {
          setNotices([
            { _id: '1', title: '36ஆவது பதிப்பு கட்டுரை சமர்பிக்கும் கடைசி நாள்', content: 'மார்ச் 30, 2025 க்குள் கட்டுரைகளை சமர்பிக்கவும்.', date: '2025-02-15T00:00:00Z', isPinned: true },
            { _id: '2', title: 'ஆண்டு இலக்கிய விழா பதிவு', content: 'ஏப்ரல் 5, 2025 வரை பதிவு செய்யலாம்.', date: '2025-03-01T00:00:00Z', isPinned: true },
            { _id: '3', title: 'ஆசிரியர் குழு மாதாந்திர கூட்டம்', content: 'மார்ச் 28, மாலை 3:00 மணி, தமிழ் துறை.', date: '2025-03-20T00:00:00Z', isPinned: false },
          ]);
        }
      } catch (err) {
        console.error("Sanity client fetch error:", err);
      }
    };
    fetchNotices();
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-[#072C21]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-cream/50">Loading Notices...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#072C21]">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="font-tamil text-5xl text-accent font-bold mb-4 drop-shadow-md">அறிவிப்பு பலகை</h1>
          <p className="font-heading text-cream/70 text-xl tracking-widest uppercase">Notice Board</p>
        </div>

        <div className="grid gap-8">
          {notices.map((notice: any) => (
            <div 
              key={notice._id} 
              className={`relative bg-[#0B3D2E] p-8 rounded-lg border ${notice.isPinned ? 'border-accent shadow-[0_0_15px_rgba(201,168,76,0.3)]' : 'border-accent/20'} overflow-hidden group`}
            >
              {notice.isPinned && (
                <div className="absolute top-4 right-4 text-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transform rotate-12 group-hover:rotate-0 transition-transform">
                  <BsPinAngleFill size={32} />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest px-3 py-1 rounded border border-accent/20">
                  {notice.date ? format(new Date(notice.date), 'MMMM d, yyyy') : 'No Date'}
                </span>
                {notice.isPinned && (
                  <span className="text-red-400 font-bold text-xs uppercase tracking-widest">Pinned</span>
                )}
              </div>
              
              <h2 className="font-tamil text-3xl font-bold text-white mb-4 line-clamp-2 leading-snug">
                {notice.title}
              </h2>
              
              <p className="font-body text-cream/80 text-lg leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
