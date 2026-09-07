import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { PageId } from '../../types';
import { ActualVsPredictedView } from '../analytics/ActualVsPredictedView';
import { ModelComparisonTable } from './ModelComparisonTable';
import {
  BarChart3,
  Award,
  TrendingUp,
  Cpu,
  BrainCircuit,
  Trees,
  CheckCircle2,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';

interface PerformanceViewProps {
  onNavigate: (page: PageId) => void;
}

// Exact benchmark values from research specification
const R2_CHART_DATA = [
  { model: 'MLP', r2: 0.460070, formatted: '0.460070', color: '#ef4444' },
  { model: 'Random Forest', r2: 0.905777, formatted: '0.905777', color: '#0284c7' },
  { model: 'XGBoost', r2: 0.907600, formatted: '0.907600', color: '#059669' },
];

const RMSE_CHART_DATA = [
  { model: 'MLP', rmse: 6.100848, formatted: '6.100848', color: '#ef4444' },
  { model: 'Random Forest', rmse: 0.073853, formatted: '0.073853', color: '#0284c7' },
  { model: 'XGBoost', rmse: 0.073600, formatted: '0.073600', color: '#059669' },
];

const MAE_CHART_DATA = [
  { model: 'MLP', mae: 4.793661, formatted: '4.793661', color: '#ef4444' },
  { model: 'Random Forest', mae: 0.052484, formatted: '0.052484', color: '#0284c7' },
  { model: 'XGBoost', mae: 0.048800, formatted: '0.048800', color: '#059669' },
];

export const PerformanceView: React.FC<PerformanceViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'actual_vs_predicted'>('comparison');

  return (
    <div className="space-y-10 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Empirical Model Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Model Performance Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
            Comparative empirical evaluation of Multi-Layer Perceptron (MLP), Random Forest Regressor, and the proposed XGBoost Regressor on 1,944 observations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-view switcher */}
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Benchmark Charts
            </button>
            <button
              onClick={() => setActiveTab('actual_vs_predicted')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'actual_vs_predicted'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Actual vs Predicted
            </button>
          </div>

          <button
            onClick={() => onNavigate('predict')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
          >
            <span>Test Model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {activeTab === 'comparison' ? (
        <div className="space-y-10">
          {/* THREE MODEL CARDS (Highlight XGBoost with 'Best Model' badge) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: MLP */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Neural Network
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Multi-Layer Perceptron (MLP)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Feedforward deep neural network baseline model
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">R² Score:</span>
                    <span className="font-bold text-slate-900">0.460070</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">RMSE:</span>
                    <span className="font-bold text-red-600">6.100848</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">MAE:</span>
                    <span className="font-bold text-red-600">4.793661</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[11px] text-slate-400">
                Significant variance due to high sparse dimensional inputs.
              </div>
            </div>

            {/* Card 2: Random Forest */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Trees className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700">
                    Bagging Ensemble
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Random Forest Regressor
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ensemble of decision trees with bagging
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">R² Score:</span>
                    <span className="font-bold text-sky-700">0.905777</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">RMSE:</span>
                    <span className="font-bold text-sky-700">0.073853</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">MAE:</span>
                    <span className="font-bold text-sky-700">0.052484</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[11px] text-slate-400">
                Strong baseline, achieving 90.58% explanatory variance.
              </div>
            </div>

            {/* Card 3: XGBoost (Highlighted with 'Best Model' Badge) */}
            <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white rounded-3xl p-6 border-2 border-emerald-400 shadow-xl shadow-emerald-900/20 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                  {/* "Best Model" Badge as specified */}
                  <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 shadow-md">
                    <Award className="w-3.5 h-3.5" />
                    <span>Best Model</span>
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white">
                  XGBoost Regressor
                </h3>
                <p className="text-xs text-emerald-200/90 mt-1">
                  Proposed gradient boosted decision tree pipeline
                </p>

                <div className="mt-4 pt-4 border-t border-emerald-800/80 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200 font-sans">R² Score:</span>
                    <span className="font-black text-emerald-300 text-sm">0.907600 (90.76%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200 font-sans">RMSE:</span>
                    <span className="font-bold text-emerald-300">0.073600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200 font-sans">MAE:</span>
                    <span className="font-bold text-emerald-300">0.048800</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center gap-1.5 text-[11px] text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lowest error & highest precision on test data</span>
              </div>
            </div>
          </div>

          {/* THREE INTERACTIVE CHARTS AS SPECIFIED */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CHART 1: R² Score Comparison */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chart 1: R² Score Comparison
                  </h3>
                  <p className="text-[11px] text-slate-500">Coefficient of Determination (Higher is better)</p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  R² Max = 1.0
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={R2_CHART_DATA} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="model"
                      tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis
                      domain={[0, 1.0]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <div className="font-bold text-emerald-400">{data.model}</div>
                              <div>R² Score: <span className="font-mono font-bold">{data.formatted}</span></div>
                              <div className="text-[10px] text-slate-400">Accuracy: {(data.r2 * 100).toFixed(2)}%</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="r2" radius={[6, 6, 0, 0]}>
                      {R2_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-slate-500 pt-1 font-mono flex justify-between">
                <span>MLP: 0.4601</span>
                <span>RF: 0.9058</span>
                <span className="text-emerald-700 font-bold">XGB: 0.9076</span>
              </div>
            </div>

            {/* CHART 2: RMSE Comparison */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chart 2: RMSE Comparison
                  </h3>
                  <p className="text-[11px] text-slate-500">Root Mean Squared Error (Lower is better)</p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Days (Scaled)
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RMSE_CHART_DATA} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="model"
                      tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis
                      domain={[0, 7]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <div className="font-bold text-emerald-400">{data.model}</div>
                              <div>RMSE: <span className="font-mono font-bold">{data.formatted}</span></div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rmse" radius={[6, 6, 0, 0]}>
                      {RMSE_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-slate-500 pt-1 font-mono flex justify-between">
                <span>MLP: 6.1008</span>
                <span>RF: 0.0739</span>
                <span className="text-emerald-700 font-bold">XGB: 0.0736</span>
              </div>
            </div>

            {/* CHART 3: MAE Comparison */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chart 3: MAE Comparison
                  </h3>
                  <p className="text-[11px] text-slate-500">Mean Absolute Error (Lower is better)</p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Days (Scaled)
                </span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MAE_CHART_DATA} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="model"
                      tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis
                      domain={[0, 5.5]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <div className="font-bold text-emerald-400">{data.model}</div>
                              <div>MAE: <span className="font-mono font-bold">{data.formatted}</span></div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="mae" radius={[6, 6, 0, 0]}>
                      {MAE_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-slate-500 pt-1 font-mono flex justify-between">
                <span>MLP: 4.7937</span>
                <span>RF: 0.0525</span>
                <span className="text-emerald-700 font-bold">XGB: 0.0488</span>
              </div>
            </div>
          </div>

          {/* Model Comparison Table */}
          <ModelComparisonTable />

          {/* Quick jump to Actual vs Predicted */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Explore Regression Concordance on Test Data
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect how actual ground-truth Days to Heading align against XGBoost predicted values on the 45° reference line.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('actual_vs_predicted')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            >
              <span>View Actual vs Predicted Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* ACTUAL VS PREDICTED PAGE / SECTION */
        <ActualVsPredictedView />
      )}
    </div>
  );
};
