import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  RotateCcw,
  BarChart3,
  Copy,
  Info,
  Layers,
  ArrowRight,
  TrendingUp,
  Sliders,
  Sprout
} from 'lucide-react';
import { PredictionResult, CropInput, PageId } from '../../types';
import { PredictionGauge } from './PredictionGauge';

interface PredictionResultCardProps {
  result: PredictionResult;
  inputData: CropInput;
  onReset: () => void;
  onNavigateInsights: () => void;
  onCopyResult?: () => void;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  result,
  inputData,
  onReset,
  onNavigateInsights,
  onCopyResult,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300 transition-all space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-7 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Inference Result Generated</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Predicted Days to Heading
            </h2>
            <p className="text-xs text-emerald-100/90 mt-1">
              Accession: <strong className="text-white">{inputData.Name}</strong> • Line: <strong className="text-white">{inputData.Taxa}</strong> • Field: <strong className="text-white">{inputData.Location}</strong>
            </p>
          </div>

          {onCopyResult && (
            <button
              onClick={onCopyResult}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition self-start sm:self-auto cursor-pointer"
              title="Copy Summary to Clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Result</span>
            </button>
          )}
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Main Metric & Gauge Section */}
      <div className="px-6 sm:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main DTH Value Callout (Large Font) */}
          <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50 border border-emerald-100/80">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Predicted Days to Heading
            </span>

            {/* VERY LARGE FONT DISPLAY */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-7xl font-black text-slate-900 font-mono tracking-tight">
                {result.prediction}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                Days
              </span>
            </div>

            {/* SUPPORTING TEXT AS SPECIFIED */}
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              Estimated time until the crop reaches the heading stage.
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold">
                {result.maturityCategory || 'Optimal Heading Window'}
              </span>
              <span className="text-slate-500 font-medium">
                Target Phenological Stage: <strong className="text-slate-700">Inflorescence Emergence</strong>
              </span>
            </div>
          </div>

          {/* Visual Semi-Circular Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-50/80 border border-slate-200/80">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-1">
              Heading Timing Gauge
            </div>
            <PredictionGauge value={result.prediction} min={140} max={200} />
            <p className="text-[11px] text-slate-400 text-center mt-1">
              Calibrated against 1,944 multi-environment observations
            </p>
          </div>
        </div>

        {/* Model Specifications Callout Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900 text-white font-mono text-center">
          <div className="p-2 border-r border-slate-800 last:border-0">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Model Used</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400">XGBoost Regressor</span>
          </div>
          <div className="p-2 border-r border-slate-800 last:border-0">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Model Performance</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">R² = 0.9076</span>
          </div>
          <div className="p-2 border-r border-slate-800 last:border-0">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">RMSE Metric</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">0.0736</span>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">MAE Metric</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">0.0488</span>
          </div>
        </div>

        {/* Supporting Explanation */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            {result.explanation ||
              'Prediction generated by the champion XGBoost Regressor model. Canopy height and biomass yield contributed most significantly to the inflorescence emergence timing.'}
          </p>
        </div>

        {/* INPUT SUMMARY CARD AS SPECIFIED */}
        <div className="bg-slate-50/90 rounded-3xl p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Input Summary
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">9 User-Entered Features</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Name</span>
              <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{inputData.Name}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Taxa</span>
              <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{inputData.Taxa}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Family</span>
              <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{inputData.Family}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
              <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{inputData.Location}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Env (Year)</span>
              <span className="text-xs font-bold text-slate-800 font-mono block mt-0.5">{inputData.Env}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Yield</span>
              <span className="text-xs font-bold text-emerald-700 font-mono block mt-0.5">{inputData.Yield} t/ha</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">TSTWT</span>
              <span className="text-xs font-bold text-slate-800 font-mono block mt-0.5">{inputData.TSTWT} lb/bu</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Protein</span>
              <span className="text-xs font-bold text-slate-800 font-mono block mt-0.5">{inputData.Protein}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs sm:col-span-2 lg:col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Height</span>
              <span className="text-xs font-bold text-slate-800 font-mono block mt-0.5">{inputData.Height} inches</span>
            </div>
          </div>
        </div>

        {/* BUTTONS AS SPECIFIED: “Make Another Prediction” & “View Model Insights” */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pb-6 pt-2 border-t border-slate-100">
          <button
            onClick={onReset}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Make Another Prediction</span>
          </button>

          <button
            onClick={onNavigateInsights}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>View Model Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};
