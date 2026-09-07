import React from 'react';
import {
  Sparkles,
  BarChart3,
  CheckCircle2,
  Cpu,
  Sprout,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Leaf
} from 'lucide-react';
import { PageId } from '../../types';

interface LandingHeroProps {
  onNavigate: (page: PageId) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-emerald-500/20">
      {/* Decorative AI & Agriculture Background Grids & Glows */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596690a_1px,transparent_1px),linear-gradient(to_bottom,#0596690a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge: “AI-Powered Precision Agriculture” */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI-Powered Precision Agriculture</span>
          </div>

          {/* Main Heading: “Predict Crop Days to Heading with Machine Learning” */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Predict Crop Days to Heading{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
              with Machine Learning
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            An intelligent machine learning framework that predicts Days to Heading (DTH) using phenotypic data and advanced XGBoost modeling.
          </p>

          {/* Action Buttons: Primary “Start Prediction” & Secondary “Explore Model” */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => onNavigate('predict')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Prediction</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <BarChart3 className="w-5 h-5 text-emerald-300" />
              <span>Explore Model</span>
            </button>
          </div>

          {/* Quick Credibility Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>90.76% Model R² Performance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SHAP Feature Interpretability</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>1,944 Agronomic Records</span>
            </div>
          </div>
        </div>

        {/* Right Column: Agriculture + AI Visual Illustration */}
        <div className="lg:col-span-5">
          <div className="relative bg-slate-900/85 rounded-2xl border border-emerald-500/30 p-5 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Subtle floating particles in background */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-6 -left-6 w-20 h-20 bg-teal-500/20 rounded-full blur-xl animate-pulse" />

            {/* Header of AI Card */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-green-400/20 text-emerald-400 border border-emerald-500/30">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                    <span>Phenotypic AI Inference</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-[11px] text-emerald-400">Crop Days to Heading (DTH)</div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                XGBoost Ready
              </span>
            </div>

            {/* Visual Illustration Elements: Crops, Data Analytics, Machine Learning */}
            <div className="py-4 space-y-4 relative z-10">
              {/* Phenological Crop Growth Stages */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Growth Stage Progression</span>
                  <span className="text-emerald-400">Heading Stage Target</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-base block">🌱</span>
                    <span className="text-[10px] text-slate-300 font-bold block mt-0.5">Vegetative</span>
                    <span className="text-[9px] text-slate-400">0 - 120 d</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-base block">🌿</span>
                    <span className="text-[10px] text-slate-300 font-bold block mt-0.5">Booting</span>
                    <span className="text-[9px] text-slate-400">120 - 165 d</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20">
                    <span className="text-base block">🌾</span>
                    <span className="text-[10px] text-emerald-200 font-bold block mt-0.5">Heading</span>
                    <span className="text-[9px] text-emerald-400 font-semibold">170 - 178 d</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-base block">☀️</span>
                    <span className="text-[10px] text-slate-300 font-bold block mt-0.5">Maturity</span>
                    <span className="text-[9px] text-slate-400">&gt; 180 d</span>
                  </div>
                </div>
              </div>

              {/* Real-time Model Confidence & Metrics Card */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Proposed Model Performance</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">90.76% (R²)</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: '90.76%' }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                  <span>R² = 0.9076</span>
                  <span>RMSE = 0.0736</span>
                  <span>MAE = 0.0488</span>
                </div>
              </div>

              {/* Sample Prediction Preview */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-900/40 via-teal-900/20 to-slate-900/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Sample DHARWAR_57</div>
                    <div className="text-[10px] text-emerald-400">Predicted Heading Window</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-400 font-mono">175.8 Days</span>
                  <div className="text-[9px] text-slate-400">Optimal Heading</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
