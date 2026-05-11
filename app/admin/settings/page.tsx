import React from 'react';
import { FiSave } from 'react-icons/fi';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Settings | Admin Dashboard',
};

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: settingsResult } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  const settings = settingsResult || {
    site_name: 'Ilanthoodhu',
    contact_email: 'illanthoodhu32@gmail.com',
    site_description: 'Ilanthoodhu student literary magazine official website.'
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-3xl">
      <div>
        <h2 className="text-2xl font-display font-medium text-white tracking-tight">Platform Settings</h2>
        <p className="text-white/50 text-sm">Configure your website's core properties.</p>
      </div>

      <div className="admin-glass-panel p-8 space-y-8">
        <div className="space-y-4 border-b border-white/5 pb-8">
          <h3 className="text-lg font-medium text-white/90">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">Site Name</label>
              <input type="text" defaultValue={settings.site_name} className="admin-input" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60 font-medium">Contact Email</label>
              <input type="email" defaultValue={settings.contact_email} className="admin-input" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-white/60 font-medium">Site Description</label>
              <textarea 
                rows={3} 
                defaultValue={settings.site_description} 
                className="admin-input resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 border-b border-white/5 pb-8">
          <h3 className="text-lg font-medium text-white/90">Integrations</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-white/[0.01]">
              <div>
                <h4 className="text-white font-medium">Supabase Authentication</h4>
                <p className="text-xs text-white/40 mt-1">Status: Connected</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>

            <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-white/[0.01]">
              <div>
                <h4 className="text-white font-medium">Sanity CMS Content</h4>
                <p className="text-xs text-white/40 mt-1">Status: Connected</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="admin-btn flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
