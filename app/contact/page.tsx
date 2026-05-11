'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Contact Us</h1>
          <p className="font-body text-cream/70 text-lg">We'd love to hear from you. Reach out for any inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-[#072C21] rounded border border-accent/20 p-8 md:p-16 shadow-2xl">
          
          {/* Left: Info */}
          <div className="flex flex-col space-y-8">
            <div>
              <h3 className="font-tamil text-3xl font-bold text-accent mb-4">தொடர்புக்கு</h3>
              <address className="not-italic font-body text-cream leading-relaxed text-lg">
                Ilanthoodhu Student Literary Journal<br/>
                Sacred Heart College (Autonomous)<br/>
                Tirupattur - 635 601<br/>
                Tamil Nadu, India.
              </address>
            </div>
            
            <div className="w-16 h-px bg-accent/30" />
            
            <div>
              <h4 className="font-heading text-accent/80 uppercase tracking-widest text-sm font-bold mb-2">Email Us</h4>
              <a href="mailto:illanthoodhu32@gmail.com" className="font-body text-xl text-white hover:text-accent transition-colors">
                illanthoodhu32@gmail.com
              </a>
            </div>

            <div>
              <h4 className="font-heading text-accent/80 uppercase tracking-widest text-sm font-bold mb-2">Connect With Us</h4>
              <div className="flex gap-4 mt-2">
                <a href="#" className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-all duration-300 transform hover:-translate-y-1"><FaFacebook size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-all duration-300 transform hover:-translate-y-1"><FaInstagram size={20} /></a>
                <a href="https://youtube.com/channel/UCSWVu032fMEDwXNavNRhiVw" target="_blank" className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-primary-dark transition-all duration-300 transform hover:-translate-y-1"><FaYoutube size={20} /></a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#0B3D2E] p-8 rounded border border-accent/10 shadow-inner align-top">
            <h3 className="font-heading text-2xl text-white font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-heading text-cream/70 text-sm tracking-wider uppercase mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#072C21] border border-accent/30 rounded text-cream focus:outline-none focus:border-accent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-heading text-cream/70 text-sm tracking-wider uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#072C21] border border-accent/30 rounded text-cream focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-heading text-cream/70 text-sm tracking-wider uppercase mb-2">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-[#072C21] border border-accent/30 rounded text-cream focus:outline-none focus:border-accent resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-accent/10 border border-accent text-accent font-bold tracking-widest uppercase rounded hover:bg-accent hover:text-primary-dark transition-colors duration-300 disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && <div className="p-4 bg-green-900/40 text-green-300 border border-green-800 rounded">Thank you! Your message has been sent.</div>}
              {status === 'error' && <div className="p-4 bg-red-900/40 text-red-300 border border-red-800 rounded">Failed to send. Please try again or email us directly.</div>}
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
