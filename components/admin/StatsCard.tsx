import React from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="admin-glass-panel p-6 relative overflow-hidden group">
      {/* Decorative gradient blob on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/0 rounded-full blur-3xl transition-colors duration-500 group-hover:bg-white/5 pointer-events-none"></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-white/50 text-sm font-medium mb-1 font-display tracking-wide">{title}</p>
          <h3 className="text-3xl font-display font-medium text-white tracking-tight">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span className="font-medium">
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-white/30 text-xs ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
