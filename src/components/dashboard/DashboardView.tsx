import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Database,
  Layers,
  Sliders,
  Sparkles,
  BarChart3,
  Trash2,
  Download,
  Calendar,
  ArrowRight,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { PageId, PredictionHistoryItem } from '../../types';
import { historyService } from '../../services/historyService';
import { R2_COMPARISON_DATA } from '../../data/modelMetrics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

interface DashboardViewProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onShowToast }) => {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleDeleteItem = (id: string) => {
    const updated = historyService.deleteItem(id);
    setHistory(updated);
    onShowToast('Record Removed', 'Prediction removed from history.', 'info');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all prediction history?')) {
      historyService.clearHistory();
      setHistory([]);
      onShowToast('History Cleared', 'All stored predictions have been removed.', 'info');
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) {
      onShowToast('No Records', 'No predictions available to export.', 'error');
      return;
    }
    historyService.exportCSV();
    onShowToast('Export Started', 'Prediction history exported as CSV.', 'success');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-lg border border-emerald-600/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Agricultural Analytics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome to AgriDTH AI
            </h1>
            <p className="mt-1 text-sm sm:text-base text-emerald-100/90 max-w-xl">
              Intelligent Days to Heading Prediction using Machine Learning
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('predict')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Predict Days to Heading</span>
            </button>
            <button
              onClick={() => onNavigate('performance')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-900/50 hover:bg-emerald-900/70 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-emerald-300" />
              <span>View Benchmarks</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="XGBoost Performance"
          value="90.76%"
          subtitle="R² coefficient of determination"
          badge="Best Model"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
          onClick={() => onNavigate('performance')}
        />
        <StatCard
          title="Dataset Records"
          value="1,944"
          subtitle="Multi-environment crop observations"
          badge="Pheno.csv"
          icon={Database}
          iconColor="text-sky-600"
          bgColor="bg-sky-50"
          onClick={() => onNavigate('dataset')}
        />
        <StatCard
          title="ML Models Evaluated"
          value="3"
          subtitle="MLP, Random Forest & XGBoost"
          badge="Regression"
          icon={Layers}
          iconColor="text-teal-600"
          bgColor="bg-teal-50"
          onClick={() => onNavigate('framework')}
        />
        <StatCard
          title="Input Features"
          value="9"
          subtitle="4 Categorical + 5 Numerical traits"
          badge="1,328 Encoded"
          icon={Sliders}
          iconColor="text-amber-600"
          bgColor="bg-amber-50"
          onClick={() => onNavigate('dataset')}
        />
      </div>

      {/* Large Model Performance Chart Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Model Performance Comparison (R² Score)
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated on the 20% test holdout partition (389 samples)
            </p>
          </div>
          <button
            onClick={() => onNavigate('performance')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Full Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={R2_COMPARISON_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="model"
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
                        <div className="font-bold text-sm text-emerald-400">{data.fullName}</div>
                        <div>R² Score: <span className="font-mono font-bold">{data.r2.toFixed(6)}</span></div>
                        <div>Accuracy: <span className="font-mono font-bold text-emerald-300">{data.percentage}%</span></div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="r2" radius={[8, 8, 0, 0]}>
                {R2_COMPARISON_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.model === 'XGBoost' ? '#16a34a' : entry.model === 'Random Forest' ? '#0ea5e9' : '#94a3b8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-xs text-slate-500 font-medium">Multi-Layer Perceptron (MLP)</span>
            <div className="text-base font-bold text-slate-700 font-mono mt-0.5">R² 0.460070</div>
            <span className="text-[11px] text-slate-400">Baseline Neural Net</span>
          </div>
          <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-200/60 text-center">
            <span className="text-xs text-sky-800 font-medium">Random Forest</span>
            <div className="text-base font-bold text-sky-700 font-mono mt-0.5">R² 0.905777</div>
            <span className="text-[11px] text-sky-600">Strong Ensemble</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center relative overflow-hidden">
            <div className="absolute top-1 right-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-200/80 px-1.5 py-0.2 rounded">
              Best
            </div>
            <span className="text-xs text-emerald-900 font-bold">XGBoost Regressor</span>
            <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">R² 0.907600</div>
            <span className="text-[11px] text-emerald-600 font-medium">Proposed Champion</span>
          </div>
        </div>
      </div>

      {/* Recent Predictions Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Predictions</h2>
            <p className="text-xs text-slate-500">
              Predictions cached in local storage with phenotypic inputs and predicted DTH
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
              title="Export as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClearHistory}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40 transition"
              title="Clear History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={() => onNavigate('predict')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Prediction</span>
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">No predictions recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Run a prediction to view historical records here.</p>
            <button
              onClick={() => onNavigate('predict')}
              className="mt-3 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Go to Prediction Form
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs text-slate-500 uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-semibold">Crop Name</th>
                  <th className="py-3 px-4 font-semibold">Predicted DTH</th>
                  <th className="py-3 px-4 font-semibold">Model</th>
                  <th className="py-3 px-4 font-semibold hidden md:table-cell">Key Phenotypes</th>
                  <th className="py-3 px-4 font-semibold hidden sm:table-cell">Confidence</th>
                  <th className="py-3 px-4 font-semibold hidden lg:table-cell">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span>{item.cropName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal pl-4">
                        {item.taxa} • {item.family}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-sm border border-emerald-200/70">
                        <span>{item.predictedDTH}</span>
                        <span className="text-xs font-normal">Days</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {item.model}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 hidden md:table-cell">
                      <span>Ht: {item.height} in | Yld: {item.yieldVal} t/ha | Prot: {item.protein}%</span>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.confidence}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 hidden lg:table-cell font-mono">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
