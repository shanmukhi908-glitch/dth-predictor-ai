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
  Sprout,
  AlertTriangle,
  FlaskConical,
  Database,
  ShieldCheck
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
  const isExternal = result.isExternalData || inputData.mode === 'external';
  const hasUnseenCategories = Boolean(result.unseenCategories && result.unseenCategories.length > 0);

  return (
    <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300 transition-all space-y-6">
      {/* Header Banner */}
      <div
        className={`text-white p-6 sm:p-7 relative overflow-hidden transition-colors duration-300 ${
          isExternal
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900'
            : 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Inference Result Generated</span>
              </div>

              {/* Mode Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                  isExternal
                    ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40'
                    : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                }`}
              >
                {isExternal ? (
                  <>
                    <FlaskConical className="w-3.5 h-3.5 text-indigo-300" />
                    <span>External Data Prediction</span>
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Dataset Sample Prediction</span>
                  </>
                )}
              </div>

              {/* Confidence Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidence: {result.confidence || 'Very High'} ({result.confidencePercentage || 90.76}%)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Predicted Days to Heading
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Crop: <strong className="text-emerald-300">{inputData.Crop || result.crop || 'Wheat'}</strong> • Accession: <strong className="text-white">{inputData.Name}</strong> • Line: <strong className="text-white">{inputData.Taxa}</strong> • Field: <strong className="text-white">{inputData.Location}</strong>
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
        <div
          className={`absolute right-0 top-0 -mt-10 -mr-10 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
            isExternal ? 'bg-indigo-500/20' : 'bg-emerald-500/20'
          }`}
        />
      </div>

      {/* Main Metric & Gauge Section */}
      <div className="px-6 sm:px-8 space-y-6">
        {/* Warning Banner if Unseen Categories Detected */}
        {hasUnseenCategories && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Novel / Out-of-Sample Categories Detected
                </h4>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900">
                  Genetic Baseline Applied
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {result.warning ||
                  'The model encountered germplasms or categories outside the historical training dataset. Prediction is driven by environmental thermal year and phenotypic measurements (Yield, TSTWT, Protein, Height).'}
              </p>
              {result.unseenCategories && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.unseenCategories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-[11px] font-mono text-amber-800"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main DTH Value Callout */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center p-6 sm:p-8 rounded-3xl border ${
              isExternal
                ? 'bg-gradient-to-br from-indigo-50/70 via-slate-50 to-slate-50 border-indigo-100'
                : 'bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50 border-emerald-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Predicted Days to Heading
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isExternal ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isExternal ? 'External Agronomic Inference' : 'Historical Dataset Inference'}
              </span>
            </div>

            {/* VERY LARGE FONT DISPLAY */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-7xl font-black text-slate-900 font-mono tracking-tight">
                {result.prediction}
              </span>
              <span
                className={`text-2xl sm:text-3xl font-extrabold ${
                  isExternal ? 'text-indigo-600' : 'text-emerald-600'
                }`}
              >
                Days
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              Estimated time required from planting/emergence until inflorescence heading.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`px-3 py-1 rounded-full text-white font-bold ${
                  isExternal ? 'bg-indigo-600' : 'bg-emerald-600'
                }`}
              >
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
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Inference Mode</span>
            <span className="text-xs sm:text-sm font-bold text-cyan-300">
              {isExternal ? 'External Input' : 'Dataset Sample'}
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Confidence</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">
              {result.confidence || 'Very High'}
            </span>
          </div>
        </div>

        {/* Supporting Explanation */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isExternal
              ? 'bg-indigo-50/60 border-indigo-200/80 text-indigo-950'
              : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
          }`}
        >
          <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isExternal ? 'text-indigo-700' : 'text-emerald-700'}`} />
          <p className="text-xs sm:text-sm leading-relaxed">
            {result.explanation ||
              'Prediction generated by the champion XGBoost Regressor model. Canopy height, environmental thermal conditions, and grain yield drive inflorescence emergence timing.'}
          </p>
        </div>

        {/* INPUT SUMMARY CARD */}
        <div className="bg-slate-50/90 rounded-3xl p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Input Summary ({isExternal ? 'External Data' : 'Dataset Sample'})
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">10 Agronomic & Trait Features</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Crop</span>
              <span className="text-xs font-bold text-emerald-950 truncate block mt-0.5">{inputData.Crop || result.crop || 'Wheat'}</span>
            </div>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pb-6 pt-2 border-t border-slate-100">
          <button
            onClick={onReset}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer ${
              isExternal
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
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
