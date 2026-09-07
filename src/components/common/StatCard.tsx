import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  icon: Icon,
  iconColor = 'text-emerald-600',
  bgColor = 'bg-emerald-50',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-emerald-300/80 transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${bgColor} ${iconColor} flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
