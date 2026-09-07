import React, { useState } from 'react';
import {
  Menu,
  X,
  Sparkles,
  Sprout,
  Activity,
  Cpu,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  GitMerge,
  BookOpen,
  Home
} from 'lucide-react';
import { PageId } from '../../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenMobileMenu?: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { id: 'predict', label: 'Predict DTH', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'explainability', label: 'Explainability', icon: <BrainCircuit className="w-4 h-4" /> },
  { id: 'methodology', label: 'Methodology', icon: <GitMerge className="w-4 h-4" /> },
  { id: 'about', label: 'About', icon: <BookOpen className="w-4 h-4" /> },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  DTH Predictor AI
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Research
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Precision Agriculture ML Framework
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-700' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Model Badge & CTA Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Live Model Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>XGBoost 90.76% R²</span>
            </div>

            {/* Primary Action Button: "Start Prediction" */}
            <button
              onClick={() => handleNavClick('predict')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Prediction</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {isMobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileDrawerOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navigation Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-emerald-700' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs text-slate-500 font-mono">
            <span>Model: XGBoost Regressor</span>
            <span className="text-emerald-600 font-bold">R² 0.9076</span>
          </div>
        </div>
      )}
    </header>
  );
};
