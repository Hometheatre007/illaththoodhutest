'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 admin-glass-panel relative overflow-hidden group">
      {/* Decorative subtle glows */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-white text-black font-display font-bold text-2xl flex items-center justify-center mx-auto mb-6 rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            I
          </div>
          <h1 className="text-2xl font-display text-white mb-2 tracking-tight">System Access</h1>
          <p className="text-white/40 text-sm">Sign in to the Ilanthoodhu Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                <FiMail />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="admin-input pl-11"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                <FiLock />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="admin-input pl-11"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="admin-btn w-full flex items-center justify-center gap-2 group/btn"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-white/20 uppercase tracking-widest font-display">
            Restricted Area
          </p>
        </div>
      </div>
    </div>
  );
}
