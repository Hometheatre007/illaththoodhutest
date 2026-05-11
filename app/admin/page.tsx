import React from 'react';
import StatsCard from '@/components/admin/StatsCard';
import { FiUsers, FiFileText, FiEye, FiMail } from 'react-icons/fi';

export const metadata = {
  title: 'Admin Dashboard | Ilanthoodhu',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-display font-medium text-white tracking-tight">System Overview</h2>
        <p className="text-white/50 text-sm">Real-time metrics and administration controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Articles" 
          value="142" 
          icon={FiFileText} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatsCard 
          title="Monthly Readers" 
          value="12.4k" 
          icon={FiUsers} 
          trend={{ value: 4.2, isPositive: true }} 
        />
        <StatsCard 
          title="Page Views" 
          value="84.2k" 
          icon={FiEye} 
          trend={{ value: 1.1, isPositive: false }} 
        />
        <StatsCard 
          title="Subscribers" 
          value="3,892" 
          icon={FiMail} 
          trend={{ value: 8.5, isPositive: true }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 admin-glass-panel p-6 min-h-[400px]">
          <h3 className="text-white font-display font-medium mb-6">Visitor Traffic</h3>
          <div className="w-full h-full flex items-center justify-center border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
            <p className="text-white/30 text-sm">Chart visualization goes here</p>
          </div>
        </div>
        
        <div className="admin-glass-panel p-6 flex flex-col">
          <h3 className="text-white font-display font-medium mb-6">Recent Activity</h3>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-white/20"></div>
                <div>
                  <p className="text-sm text-white/80">New article published</p>
                  <p className="text-xs text-white/40 mt-1">2 hours ago by Editor</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
