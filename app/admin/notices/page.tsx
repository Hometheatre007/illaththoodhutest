import React from 'react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Notices | Admin Dashboard',
};

export default async function NoticesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight">Notice Board</h2>
          <p className="text-white/50 text-sm">Manage announcements and notices.</p>
        </div>
        <button className="admin-btn flex items-center gap-2 text-sm w-full sm:w-auto">
          <FiPlus /> New Notice
        </button>
      </div>

      <div className="admin-glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-display tracking-widest text-white/40 uppercase">Title</th>
                <th className="px-6 py-4 text-xs font-display tracking-widest text-white/40 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-display tracking-widest text-white/40 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-display tracking-widest text-white/40 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {notices && notices.length > 0 ? (
                notices.map((notice) => (
                  <tr key={notice.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white/90">{notice.title}</div>
                      <div className="text-xs text-white/40 truncate max-w-md mt-1">{notice.content || 'No content preview...'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium border ${
                        notice.status === 'published' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                        <FiMoreVertical />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40 text-sm">
                    No notices found. Create your first notice to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
