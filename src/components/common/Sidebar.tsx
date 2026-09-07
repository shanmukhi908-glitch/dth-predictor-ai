import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Brain,
  Wheat,
  Search,
  Info,
  Sprout,
  X,
  ExternalLink,
  CheckCircle,
  Home,
  Compass
} from 'lucide-react';
import { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Main', description: 'Overview & metrics' },
  { id: 'predict', label: 'Predict DTH', icon: Sparkles, badge: 'AI Tool', description: 'Interactive prediction' },
  { id: 'performance', label: 'Model Performance', icon: BarChart3, description: 'MLP vs RF vs XGBoost' },
  { id: 'framework', label: 'ML Framework', icon: Brain, description: '8-step pipeline' },
  { id: 'dataset', label: 'Dataset', icon: Wheat, description: 'Pheno.csv details' },
  { id: 'shap', label: 'SHAP Analysis', icon: Search, description: 'Feature explainability' },
  { id: 'about', label: 'About Project', icon: Info, description: 'Research & citations' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const handleItemClick = (id: PageId) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => handleItemClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">AgriDTH</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase border border-emerald-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
                Smart Agriculture Platform
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Model Indicator Banner */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-900">XGBoost Engine</span>
          </div>
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
            90.76% Acc
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {/* Landing Page Link */}
          <button
            onClick={() => handleItemClick('landing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 mb-2 group ${
              currentPage === 'landing'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80 bg-slate-50/50'
            }`}
          >
            <Home
              className={`w-5 h-5 flex-shrink-0 transition-colors ${
                currentPage === 'landing' ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
              }`}
            />
            <div className="flex-1 flex items-center justify-between">
              <span className="font-semibold">Landing Page</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  currentPage === 'landing' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Hero View
              </span>
            </div>
          </button>

          <div className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Navigation
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}
                />
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Research Context Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>B.Tech Research Project</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Days to Heading Phenotypic Prediction Framework
            </p>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Dataset: Pheno.csv</span>
              <span className="font-mono">1,944 rows</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
