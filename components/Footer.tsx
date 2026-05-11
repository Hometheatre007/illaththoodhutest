'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { GiDove } from 'react-icons/gi';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Subscription successful! Check your inbox.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  };

  return (
    <footer className="w-full bg-[#051F15] pt-20 pb-10 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <GiDove className="text-accent text-3xl drop-shadow-md" />
              <div className="font-tamil text-2xl font-bold text-accent tracking-wider drop-shadow-sm">
                இளந்தாது
              </div>
            </div>
            <p className="font-body text-cream/70 text-sm leading-relaxed mb-6">
              The Voice of Student Expression since 1987. A rich legacy of Tamil literary heritage nurtured at Sacred Heart College.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-primary-dark border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-colors"><FaFacebook size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-primary-dark border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-colors"><FaInstagram size={18} /></Link>
              <Link href="https://youtube.com/channel/UCSWVu032fMEDwXNavNRhiVw" target="_blank" className="w-10 h-10 rounded-full bg-primary-dark border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-colors"><FaYoutube size={18} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-heading text-xl text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 font-heading text-sm text-cream/70 tracking-widest uppercase">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/notice" className="hover:text-accent transition-colors">Notice Board</Link></li>
              <li><Link href="/history" className="hover:text-accent transition-colors">Our History</Link></li>
              <li><Link href="/library" className="hover:text-accent transition-colors">Digital Library</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1">
            <h4 className="font-heading text-xl text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 font-body text-sm text-cream/70">
              <li>Sacred Heart College<br />Tirupattur, Tamil Nadu</li>
              <li><a href="mailto:illanthoodhu32@gmail.com" className="hover:text-accent transition-colors">illanthoodhu32@gmail.com</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-heading text-xl text-white font-bold mb-6">Newsletter</h4>
            <p className="font-body text-cream/70 text-sm mb-4">Subscribe for updates on new editions and notices.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B3D2E] border border-accent/30 rounded text-cream focus:outline-none focus:border-accent placeholder-cream/40"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-3 bg-accent text-primary-dark font-bold tracking-widest uppercase rounded hover:bg-accent-light transition-colors disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <div className={`mt-3 text-sm p-2 rounded border ${status === 'success' ? 'bg-green-900/40 text-green-300 border-green-800' : 'bg-red-900/40 text-red-300 border-red-800'}`}>
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-accent/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-cream/50 text-sm text-center md:text-left">
            © {year ?? '2025'} Ilanthoodhu Student Literary Journal. All rights reserved.
          </p>
          <div className="font-body text-cream/40 text-xs text-center md:text-right leading-relaxed">
            Developed by<br />
            <span className="text-cream/60">Pugazhenthi J</span> — Dept. of Computer Science  —{' '}
            <a href="mailto:pugazhenthij283@gmail.com" className="hover:text-accent transition-colors">pugazhenthij283@gmail.com</a><br />
            <span className="text-cream/60">Nithyadharshini K</span> — Dept. of Computer Science —{' '}
            <a href="mailto:nithya4648@gmail.com" className="hover:text-accent transition-colors">nithya4648@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
