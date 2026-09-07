import React from 'react';
import { Sprout, Sparkles, Database, FileText, Cpu, ChevronRight, Heart } from 'lucide-react';
import { PageId } from '../../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-emerald-900/40 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-16 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Project Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  DTH Predictor AI
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
                  Precision Agriculture System
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              AI-powered Days to Heading prediction using phenotypic data and XGBoost.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Proposed XGBoost Regressor • R² 0.9076</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('predict')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Prediction</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('analytics')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Analytics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explainability')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Explainability</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Methodology</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>About</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Details & Citation */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Research Project Details
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Paper Title:</strong> “An Enhanced Machine Learning Framework for Predicting Days to Heading Using Phenotypic Data”
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>Dataset Specifications</span>
              </div>
              <div>1,944 Observations • 9 Features • 1 Target (DTH)</div>
              <div className="text-slate-400 text-[11px]">Evaluated across MLP, Random Forest & XGBoost</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              Powered by Machine Learning and Precision Agriculture
            </span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} DTH Predictor AI. Academic Research Demonstration.
          </div>
        </div>
      </div>
    </footer>
  );
};
