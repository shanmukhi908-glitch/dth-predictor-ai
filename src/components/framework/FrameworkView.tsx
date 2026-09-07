import React from 'react';
import { WorkflowTimeline } from './WorkflowTimeline';
import { PageId } from '../../types';
import { GitMerge, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Database, Cpu } from 'lucide-react';

interface FrameworkViewProps {
  onNavigate: (page: PageId) => void;
}

export const FrameworkView: React.FC<FrameworkViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Research Methodology Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Methodology & Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
            Complete end-to-end flowchart from raw phenotypic dataset inspection to hyperparameter optimization, XGBoost inference, and SHAP explainability.
          </p>
        </div>

        <button
          onClick={() => onNavigate('predict')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition self-start cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Predictor</span>
        </button>
      </div>

      {/* Architecture Highlights Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">1,944</div>
            <div className="text-xs text-slate-300 mt-0.5">Field Observations</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300">1,328</div>
            <div className="text-xs text-slate-300 mt-0.5">Encoded Dimensions</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">80 / 20</div>
            <div className="text-xs text-slate-300 mt-0.5">Train / Test Split</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">90.76%</div>
            <div className="text-xs text-slate-300 mt-0.5">XGBoost Accuracy (R²)</div>
          </div>
        </div>
      </div>

      {/* 13-Stage Flowchart Timeline */}
      <WorkflowTimeline />
    </div>
  );
};
